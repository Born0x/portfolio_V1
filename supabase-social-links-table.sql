-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON social_links
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON social_links
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON social_links
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON social_links
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert initial social links
INSERT INTO social_links (name, url, icon, order_index) VALUES
  ('LinkedIn', 'https://linkedin.com/in/votre-profil', 'linkedin', 1),
  ('GitHub', 'https://github.com/votre-username', 'github', 2),
  ('Twitter', 'https://twitter.com/votre-username', 'twitter', 3),
  ('Email', 'mailto:votre@email.com', 'mail', 4)
ON CONFLICT DO NOTHING;
