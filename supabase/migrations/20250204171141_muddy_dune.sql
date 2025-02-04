/*
  # Fix registration policies

  1. Changes
    - Add policy to allow inserting profiles during registration
    - Modify existing policies to ensure proper access control

  2. Security
    - Enable authenticated users to create their own profile
    - Maintain existing read access for all users
*/

-- Drop the existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Recreate the policies with proper permissions
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);