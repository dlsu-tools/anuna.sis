-- File name is 3000 in order to run migration last, always

DO $$ DECLARE r record;

BEGIN FOR r IN (
    SELECT
        tablename
    FROM
        pg_tables
    WHERE
        schemaname = 'public'
) LOOP EXECUTE 'ALTER TABLE ' || quote_ident(r.tablename) || ' ENABLE ROW LEVEL SECURITY';

END LOOP;

END $$;