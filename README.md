![](https://img.shields.io/badge/Microverse-blueviolet)

# Project Name

> One paragraph statement about the project.

![screenshot](./app_screenshot.png)

Additional description about the project and its features.

## Built With

- Major languages
- Frameworks
- Technologies used

## Live Demo

[Live Demo Link](https://livedemo.com)


## Getting Started

**This is an example of how you may give instructions on setting up your project locally.**
**Modify this file to match your project, remove sections that don't apply. For example: delete the testing section if the currect project doesn't require testing.**


To get a local copy up and running follow these simple example steps.

### Prerequisites
- ruby 3.0.0
- ruby on rails 6.1.1
- yarn 1.22.10
- node 14.15.1
- postgresql

### Setup
If you don't know how to work with postgres, run the following commands, this will give you permission to create the database.
Otherwise skip to installation.

- First you need to know the name of your system, you should see it on your terminal
- Now you need to access the psql console, on your terminal type:
```
$ sudo -u postgres psql
```
- Finally, you have to create the user the user by running:
```
postgres=# CREATE USER your_username WITH PASSWORD 'passwordInsideQuotes' CREATEDB;
```
- If you did it correctly you should see a message like this:
```
CREATE ROLE
```
- You can check your users with:
```
postgres=# \du
```
- You you should have a similar output:

- That's it! you now can close the console using:
```
postgres=# \q
```


### Install

```
$ yarn
$ bundle install
$ rails db:create
$ rails db:migrate
```

### Usage

### Run tests

### Deployment



## Authors

👤 **Author1**

- GitHub: [@githubhandle](https://github.com/githubhandle)
- Twitter: [@twitterhandle](https://twitter.com/twitterhandle)
- LinkedIn: [LinkedIn](https://linkedin.com/linkedinhandle)

👤 **Author2**

- GitHub: [@githubhandle](https://github.com/githubhandle)
- Twitter: [@twitterhandle](https://twitter.com/twitterhandle)
- LinkedIn: [LinkedIn](https://linkedin.com/linkedinhandle)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

## 📝 License

This project is [MIT](lic.url) licensed.
