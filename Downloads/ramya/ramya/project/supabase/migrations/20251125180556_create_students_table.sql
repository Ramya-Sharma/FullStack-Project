/*
  # Create Students Table

  1. New Tables
    - `students`
      - `id` (uuid, primary key) - Unique identifier for each student
      - `name` (text) - Student's full name
      - `section` (text) - Student's section/class
      - `marks` (integer) - Student's marks/score
      - `grade` (text) - Student's grade
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `students` table
    - Add policy for public access (read, insert, update, delete)
    
  3. Notes
    - This is a demo application with public access
    - In production, policies should be restricted to authenticated users
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  section text NOT NULL,
  marks integer NOT NULL CHECK (marks >= 0 AND marks <= 100),
  grade text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON students
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access"
  ON students
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON students
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON students
  FOR DELETE
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);
CREATE INDEX IF NOT EXISTS idx_students_marks ON students(marks);
CREATE INDEX IF NOT EXISTS idx_students_grade ON students(grade);