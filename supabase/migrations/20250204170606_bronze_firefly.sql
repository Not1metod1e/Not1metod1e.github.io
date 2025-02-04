/*
  # Initial Schema Setup for Scooter Rental Employee Portal

  1. New Tables
    - profiles
      - User profiles with role and statistics
    - maintenance_reports
      - Reports for battery changes, repairs, and scooter relocations
    - warnings
      - Employee warnings/reprimands
    - achievements
      - Employee achievements
    - tasks
      - Tasks assigned to employees
    
  2. Security
    - RLS policies for each table
    - Separate access levels for admins and regular employees
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'employee',
  tasks_completed INTEGER DEFAULT 0,
  reports_submitted INTEGER DEFAULT 0,
  achievements_count INTEGER DEFAULT 0,
  active_warnings INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Maintenance reports table
CREATE TABLE IF NOT EXISTS maintenance_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  report_type TEXT NOT NULL,
  scooter_id TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Warnings table
CREATE TABLE IF NOT EXISTS warnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  issued_by UUID REFERENCES profiles(id) NOT NULL,
  reason TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  awarded_at TIMESTAMPTZ DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID REFERENCES profiles(id) NOT NULL,
  assigned_to UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE warnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Maintenance reports policies
CREATE POLICY "Employees can create reports"
  ON maintenance_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Reports are viewable by everyone"
  ON maintenance_reports FOR SELECT
  USING (true);

-- Warnings policies
CREATE POLICY "Admins can create warnings"
  ON warnings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Warnings are viewable by everyone"
  ON warnings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update warnings"
  ON warnings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Achievements policies
CREATE POLICY "Admins can create achievements"
  ON achievements FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Achievements are viewable by everyone"
  ON achievements FOR SELECT
  USING (true);

-- Tasks policies
CREATE POLICY "Admins can create tasks"
  ON tasks FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Tasks are viewable by everyone"
  ON tasks FOR SELECT
  USING (true);

CREATE POLICY "Assigned users can update tasks"
  ON tasks FOR UPDATE
  USING (
    auth.uid() = assigned_to OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );