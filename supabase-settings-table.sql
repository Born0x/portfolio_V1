-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Insert initial settings
INSERT INTO site_settings (key, value) VALUES
  ('hero_banner', '/images/hero-home.jpg'),
  ('hero_banner_mobile', '/images/hero-home.jpg'),
  ('hero_title', 'Portfolio de Mehdi Zeroual'),
  ('hero_tagline', 'Entrepreneur • Développeur • Apprenant'),
  ('hero_description', 'Bienvenue dans mon univers. Découvrez mes projets entrepreneuriaux, mes certifications, et mon parcours de développement personnel et professionnel.'),
  ('cv_url', '')
ON CONFLICT (key) DO NOTHING;
