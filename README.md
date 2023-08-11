# App

Gympass styled app

## FRs
- [ ] It should be able to register an user
- [ ] It should be able to authenticate as an created user
- [ ] It should be able to get a signed in user's profile
- [ ] It should be able to count the check-ins made by signed in user
- [ ] An user should be able to see its check-ins history
- [ ] An user should be able to fetch nearby gyms
- [ ] An user should be able to search a gym by its name
- [ ] An user should be able to check-in a t a gym
- [ ] It should be able to validate an user's check-in
- [ ] It should be able to register a gym

## BRs
- [ ] An user shouldn't be able to register with a duplicate e-mail
- [ ] An user shouldn't be able to check in twice a day
- [ ] An user shouldn't be able to check in if they're not nearby (100m) a gym
- [ ] A check-in can only be validated until after 20 minutes it was registered
- [ ] A check-in can only be validated by admins
- [ ] A gym can only be registered by admins

## NFRs
- [ ] An user's password should be encrypted
- [ ] Application data should be stored in a PostgreSQL database
- [ ] All data list should be paged with 20 items per page
- [ ] User should be identified JWT (JSON Web Token)