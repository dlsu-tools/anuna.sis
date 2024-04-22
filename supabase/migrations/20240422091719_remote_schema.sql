
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

ALTER SCHEMA "public" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."colleges" (
    "id" smallint NOT NULL,
    "name" "text" NOT NULL,
    "acronym" "text" NOT NULL
);

ALTER TABLE "public"."colleges" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."completedCourses" (
    "id" integer NOT NULL,
    "user" integer,
    "courseCode" integer,
    "termCompleted" numeric(4,0),
    "credited" boolean DEFAULT false
);

ALTER TABLE "public"."completedCourses" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."contacts" (
    "id" integer NOT NULL,
    "platform" smallint,
    "link" "text"
);

ALTER TABLE "public"."contacts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."corequisites" (
    "id" integer NOT NULL,
    "courseA" integer NOT NULL,
    "courseB" integer NOT NULL
);

ALTER TABLE "public"."corequisites" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."courseCodes" (
    "id" integer NOT NULL,
    "code" character(6) NOT NULL,
    "fullName" "text",
    "units" integer,
    "academic" boolean DEFAULT true,
    "isGeneric" boolean DEFAULT false
);

ALTER TABLE "public"."courseCodes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."courseEnrollment" (
    "id" integer NOT NULL,
    "user" integer,
    "class" integer
);

ALTER TABLE "public"."courseEnrollment" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."courseEquivalents" (
    "id" integer NOT NULL,
    "courseA" integer NOT NULL,
    "courseB" integer NOT NULL
);

ALTER TABLE "public"."courseEquivalents" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."dissolvedSections" (
    "id" integer NOT NULL,
    "section" integer,
    "timestamp" timestamp without time zone,
    "declaredBy" "text"
);

ALTER TABLE "public"."dissolvedSections" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."enlistmentTimes" (
    "id" integer NOT NULL,
    "batch" integer,
    "batchBelow" boolean DEFAULT false,
    "college" smallint,
    "priorityLevel" integer,
    "enlistmentStart" timestamp without time zone
);

ALTER TABLE "public"."enlistmentTimes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."faculty" (
    "id" integer NOT NULL,
    "lastName" "text",
    "name" "text"
);

ALTER TABLE "public"."faculty" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."friends" (
    "id" integer NOT NULL,
    "userA" integer NOT NULL,
    "userB" integer NOT NULL
);

ALTER TABLE "public"."friends" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."platforms" (
    "id" smallint NOT NULL,
    "platform" "text"
);

ALTER TABLE "public"."platforms" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."prerequisites" (
    "id" integer NOT NULL,
    "course" integer,
    "requisite" integer,
    "minGrade" numeric(2,1)
);

ALTER TABLE "public"."prerequisites" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."primarySchedules" (
    "id" integer NOT NULL,
    "user" integer,
    "schedule" integer NOT NULL
);

ALTER TABLE "public"."primarySchedules" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."priorityStatuses" (
    "id" integer NOT NULL,
    "status" "text" NOT NULL
);

ALTER TABLE "public"."priorityStatuses" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."programEnrollment" (
    "id" integer NOT NULL,
    "user" integer,
    "program" integer,
    "isMinor" boolean DEFAULT false
);

ALTER TABLE "public"."programEnrollment" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."programRequirements" (
    "id" integer NOT NULL,
    "program" integer,
    "course" integer,
    "prescribedTerm" numeric(4,0)
);

ALTER TABLE "public"."programRequirements" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."programTypes" (
    "id" integer NOT NULL,
    "text" "text"
);

ALTER TABLE "public"."programTypes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."programs" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "type" integer
);

ALTER TABLE "public"."programs" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."scheduleMembership" (
    "id" integer NOT NULL,
    "userId" integer,
    "scheduleId" integer,
    "role" integer,
    "lastModified" "date"
);

ALTER TABLE "public"."scheduleMembership" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."scheduleRole" (
    "id" integer NOT NULL,
    "type" "text"
);

ALTER TABLE "public"."scheduleRole" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."scheduleSlots" (
    "id" integer NOT NULL,
    "schedule" integer NOT NULL,
    "section" integer NOT NULL
);

ALTER TABLE "public"."scheduleSlots" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."schedules" (
    "id" integer NOT NULL,
    "dateCreated" "date"
);

ALTER TABLE "public"."schedules" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."sectionSchedule" (
    "id" integer NOT NULL,
    "class" integer,
    "day" character(1),
    "startTime" time without time zone,
    "endTime" time without time zone,
    "room" "text"
);

ALTER TABLE "public"."sectionSchedule" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."sections" (
    "id" integer NOT NULL,
    "classNumber" integer,
    "faculty" integer,
    "section" "text",
    "courseCode" integer NOT NULL,
    "enrollment" integer DEFAULT 0,
    "capacity" integer,
    "remarks" "text",
    "term" numeric(4,0)
);

ALTER TABLE "public"."sections" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."stats_sectionPopularity" (
    "id" integer NOT NULL,
    "section" integer,
    "timestamp" timestamp without time zone,
    "schedulesCount" integer
);

ALTER TABLE "public"."stats_sectionPopularity" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."stats_sectionPopulation" (
    "id" integer NOT NULL,
    "section" integer,
    "capacity" integer,
    "enrolled" integer,
    "timestamp" timestamp without time zone
);

ALTER TABLE "public"."stats_sectionPopulation" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."userDayPreferences" (
    "id" integer NOT NULL,
    "user" integer,
    "day" character(1),
    "preferenceLevel" smallint
);

ALTER TABLE "public"."userDayPreferences" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."userFacultyPrefernces" (
    "id" integer NOT NULL,
    "user" integer,
    "faculty" integer NOT NULL,
    "prefernceLevel" smallint
);

ALTER TABLE "public"."userFacultyPrefernces" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."userTimePrefernces" (
    "id" integer NOT NULL,
    "user" integer,
    "startTime" time without time zone,
    "endTime" time without time zone,
    "preferenceLevel" smallint
);

ALTER TABLE "public"."userTimePrefernces" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" integer NOT NULL,
    "dlsuId" numeric(8,0),
    "firstName" "text",
    "lastName" "text",
    "homeCollege" smallint,
    "lagunaStudent" boolean DEFAULT false,
    "priorityLevel" integer
);

ALTER TABLE "public"."users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."watchSection" (
    "id" integer NOT NULL,
    "user" integer,
    "section" integer
);

ALTER TABLE "public"."watchSection" OWNER TO "postgres";

ALTER TABLE ONLY "public"."colleges"
    ADD CONSTRAINT "colleges_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."completedCourses"
    ADD CONSTRAINT "completedCourses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."contacts"
    ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."corequisites"
    ADD CONSTRAINT "corequisites_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."courseCodes"
    ADD CONSTRAINT "courseCodes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."courseEnrollment"
    ADD CONSTRAINT "courseEnrollment_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."courseEquivalents"
    ADD CONSTRAINT "courseEquivalents_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."dissolvedSections"
    ADD CONSTRAINT "dissolvedSections_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."enlistmentTimes"
    ADD CONSTRAINT "enlistmentTimes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."faculty"
    ADD CONSTRAINT "faculty_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."friends"
    ADD CONSTRAINT "friends_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."platforms"
    ADD CONSTRAINT "platforms_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."prerequisites"
    ADD CONSTRAINT "prerequisites_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."primarySchedules"
    ADD CONSTRAINT "primarySchedules_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."primarySchedules"
    ADD CONSTRAINT "primarySchedules_user_key" UNIQUE ("user");

ALTER TABLE ONLY "public"."priorityStatuses"
    ADD CONSTRAINT "priorityStatuses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."programEnrollment"
    ADD CONSTRAINT "programEnrollment_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."programRequirements"
    ADD CONSTRAINT "programRequirements_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."programTypes"
    ADD CONSTRAINT "programTypes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."programs"
    ADD CONSTRAINT "programs_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."scheduleMembership"
    ADD CONSTRAINT "scheduleMembership_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."scheduleRole"
    ADD CONSTRAINT "scheduleRole_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."scheduleSlots"
    ADD CONSTRAINT "scheduleSlots_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."schedules"
    ADD CONSTRAINT "schedules_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."sectionSchedule"
    ADD CONSTRAINT "sectionSchedule_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."sections"
    ADD CONSTRAINT "sections_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."stats_sectionPopularity"
    ADD CONSTRAINT "stats_sectionPopularity_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."stats_sectionPopulation"
    ADD CONSTRAINT "stats_sectionPopulation_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."userDayPreferences"
    ADD CONSTRAINT "userDayPreferences_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."userFacultyPrefernces"
    ADD CONSTRAINT "userFacultyPrefernces_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."userTimePrefernces"
    ADD CONSTRAINT "userTimePrefernces_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_dlsuId_key" UNIQUE ("dlsuId");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."watchSection"
    ADD CONSTRAINT "watchSection_pkey" PRIMARY KEY ("id");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;

RESET ALL;
