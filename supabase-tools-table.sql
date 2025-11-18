-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON tools
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON tools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON tools
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON tools
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert initial tools data
INSERT INTO tools (name, logo, tags, order_index) VALUES
  ('Shopify', '/logos/shopify.svg', ARRAY['E-commerce & Web'], 1),
  ('HTML', '/logos/html.svg', ARRAY['E-commerce & Web', 'Analyse & Programmation'], 2),
  ('CSS', '/logos/css.svg', ARRAY['E-commerce & Web', 'Analyse & Programmation'], 3),
  ('Liquid', '/logos/liquid.svg', ARRAY['E-commerce & Web', 'Analyse & Programmation'], 4),
  ('Python', '/logos/python.svg', ARRAY['Analyse & Programmation', 'IA & Code'], 5),
  ('SQL', '/logos/sql.svg', ARRAY['Analyse & Programmation'], 6),
  ('VBA', '/logos/vba.svg', ARRAY['Analyse & Programmation', 'Bureautique'], 7),
  ('Claude Code', '/logos/claude.svg', ARRAY['IA & Code'], 8),
  ('Photoshop', '/logos/photoshop.svg', ARRAY['Création & Média'], 9),
  ('Adobe Premiere Pro', '/logos/premiere.svg', ARRAY['Création & Média'], 10),
  ('CapCut', '/logos/capcut.svg', ARRAY['Création & Média'], 11),
  ('Excel', '/logos/excel.svg', ARRAY['Bureautique', 'Analyse & Programmation'], 12),
  ('Word', '/logos/word.svg', ARRAY['Bureautique'], 13);
