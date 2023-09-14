# App

Gympass styled app

## FRs
- [X] It should be able to register an user
- [X] It should be able to authenticate as an created user
- [X] It should be able to get a signed in user's profile
- [X] It should be able to count the check-ins made by signed in user
- [X] An user should be able to see its check-ins history
- [X] An user should be able to fetch nearby gyms
- [X] An user should be able to search a gym by its name
- [X] An user should be able to check-in a t a gym
- [X] It should be able to validate an user's check-in
- [X] It should be able to register a gym

## BRs
- [X] An user shouldn't be able to register with a duplicate e-mail
- [X] An user shouldn't be able to check in twice a day
- [X] An user shouldn't be able to check in if they're not nearby (100m) a gym
- [X] A check-in can only be validated until after 20 minutes it was registered
- [X] A check-in can only be validated by admins
- [X] A gym can only be registered by admins

## NFRs
- [X] An user's password should be encrypted
- [X] Application data should be stored in a PostgreSQL database
- [X] All data list should be paged with 20 items per page
- [X] User should be identified JWT (JSON Web Token)