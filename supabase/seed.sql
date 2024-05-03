INSERT INTO
    colleges(name, acronym)
VALUES
    ('College of Computer Studies', 'CCS'),
    ('Gokongwei College of Engineering', 'GCOE'),
    ('College of Science', 'COS'),
    (
        'Brother Andrew Gonzalez FSC College of Education',
        'COED'
    ),
    (
        'Ramon V. del Rosario College of Business',
        'RVRCOB'
    ),
    ('School of Economics', 'SOE'),
    ('College of Liberal Arts', 'CLA');

INSERT INTO
    course_codes (course_code)
VALUES
    ('COURSE1'),
    ('COURSE2'),
    ('COURSE3'),
    ('GNERIC1'),
    ('GNERIC2');

INSERT INTO
    faculty(full_name)
VALUES
    ('DELA CRUZ, JUAN'),
    ('RIZAL, JOSE'),
    ('CLARA, MARIA'),
    ('MAGSAYSAY, RAMON');

INSERT INTO
    courses(
        class_number,
        term,
        course_code_id,
        enrolled,
        capacity,
        section,
        faculty_id
    )
VALUES
    (2849, 1230, 1, 0, 40, 'J10B', 1),
    (2496, 1230, 1, 0, 40, 'J2B8', 1),
    (2297, 1230, 2, 0, 40, 'XJ2', 3),
    (2641, 1230, 3, 0, 40, 'D95', 4),
    (4819, 1230, 3, 0, 40, 'XX29', 4),
    (9177, 1230, 2, 0, 40, 'ZZ20', 2);

INSERT INTO
    course_schedules(
        class_number,
        term,
        DAY,
        start_time,
        end_time,
        room
    )
VALUES
    (2849, 1230, 'M', '08:00', '09:30', 'A100'),
    (2496, 1230, 'T', '08:00', '09:30', 'A100'),
    (2496, 1230, 'S', '08:00', '09:30', 'ONLINE'),
    (2297, 1230, 'W', '08:00', '09:30', 'A100'),
    (2641, 1230, 'H', '08:00', '09:30', 'A100'),
    (4819, 1230, 'F', '08:00', '09:30', 'A100'),
    (9177, 1230, 'M', '08:00', '09:30', 'A100');