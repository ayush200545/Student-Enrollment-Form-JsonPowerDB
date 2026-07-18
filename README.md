# Student Enrollment Form (JsonPowerDB)

A small form-based project I built to enroll students into a database using JsonPowerDB's REST API. No backend code, no server setup, just HTML, jQuery, and a client library talking straight to the database.

## Table of Contents
- [Description](#description)
- [Why JsonPowerDB](#why-jsonpowerdb)
- [What it actually does](#what-it-actually-does)
- [Screenshot](#screenshot)
- [Trying it out](#trying-it-out)
- [Status](#status)
- [Release history](#release-history)
- [Sources](#sources)

## Description

This is a Student Enrollment Form that stores records in the `STUDENT-TABLE` relation of a `SCHOOL-DB` database on JsonPowerDB. Roll No is the primary key, and the form also captures Full Name, Class, Birth Date, Address, and Enrollment Date.

I built this as a micro project for an internship assignment, mainly to get hands-on with JPDB's REST API and with the kind of form logic that has to track state carefully: which fields are enabled, which button should be clickable, and when.

## Why JsonPowerDB

Honestly, the biggest draw is that there's no backend to set up. JPDB gives you a REST API and a small JS helper library (`jpdb-commons.js`) with functions like `createGET_BY_KEYRequest` and `createPUTRequest`, so a plain HTML page can read and write records directly. For a project like this, that's a real time-saver, I didn't have to write a single line of server code.

A few other things I liked:
- Records are just JSON, so I could add or drop a field without touching a schema migration.
- Looking something up by its key (Roll No, here) is one quick call.
- It's a pretty gentle way to learn how a database-backed form actually works end to end.

## What it actually does

When the page loads, everything is locked except the Roll No field, and the cursor sits there waiting.

Type a Roll No and click away (this fires on blur, not on every keystroke):

- **Not found yet?** The rest of the form unlocks, Save and Reset become clickable, and focus jumps to Full Name so you can start entering a new student.
- **Already exists?** The record loads into the form automatically, Roll No locks (you shouldn't be able to change a primary key mid-edit), and Update and Reset become clickable instead.

Before Save or Update actually runs, the form checks that nothing's been left blank, if a field's empty, it alerts you and puts the cursor right back there.

- **Save** inserts a new record.
- **Update** overwrites the one currently loaded.
- **Reset** wipes the form and locks it back down to the starting state.

## Screenshot

_(drop a screenshot of the running form here, e.g. `![form screenshot](screenshot.png)`)_

## Trying it out

1. Open the form and type a new Roll No, say `101`, then click elsewhere.
2. Since it doesn't exist yet, fill in the rest: name, class, birth date, address, enrollment date.
3. Hit Save.
4. Type `101` again, it should come right back, fully filled in and editable.
5. Change something and hit Update.
6. Reset any time you want a clean slate.

## Status

The core flow works: create a student, look one up by Roll No, edit it, save the changes. What I'd still like to add if I come back to this: actual date-format validation, a way to delete a record, and maybe a simple list view of everyone currently enrolled instead of only looking up one at a time.

## Release history

- **v1.0.0** – first working version: Save, Update, and Reset all wired up against JsonPowerDB, with the field-locking logic behaving the way the assignment spec described.

## Sources

- [JsonPowerDB documentation](https://www.login2explore.com/jpdb/)
- [JsonPowerDB on GitHub](https://github.com/BeAgarwal/JsonPowerDB)
- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
