-- SCRIPT DE NETTOYAGE - À exécuter AVANT supabase-schema.sql
-- Cela supprime toutes les anciennes tables et policies de votre ancien projet

-- Supprimer les anciennes tables d'abord (CASCADE supprime aussi les dépendances)
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS studies CASCADE;
DROP TABLE IF EXISTS blog CASCADE;

-- Supprimer la fonction de trigger si elle existe
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Message de confirmation
SELECT 'Nettoyage terminé ! Vous pouvez maintenant exécuter supabase-schema.sql' AS message;
