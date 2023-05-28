# 🔑 AWS SSO Session Login

The AWS SSO Session Login is a command line tool that makes it easy to log into and switch your AWS IAM Identity Center / AWS SSO sessions.

It displays the configured sessions for selection and starts the login process automatically.

## 📋 Prerequisites

Before using you need to configure your SSO sessions using the AWS CLI.

To do this, run the following command in your terminal:

```sh
aws configure sso-session
```

Or set up the SSO sessions manually in your `~/.aws/config` as in the example below:

```config
[profile bear-admin]
sso_session = apple
sso_account_id = 123456789012
sso_role_name = admin

[profile minion-admin]
sso_session = banana
sso_account_id = 987654321098
sso_role_name = admin

[sso-session apple]
sso_start_url = https://apple-portal.awsapps.com/start
sso_region = us-west-2

[sso-session banana]
sso_start_url = https://banana-portal.awsapps.com/start
sso_region = us-west-2
```

For more information on setting up your SSO session with the AWS CLI, refer to the official [AWS documentation](https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html).

## 🛠️ Setup

Install the command line tool globally by running the following command in your terminal:

```sh
npm install -g aws-sso-login
```

This will install the latest version and make it available globally under `awsl`.

## 🚀 Usage

Simply run the `awsl` command in your terminal.

```sh
awsl
```

You will be presented with a list of your available AWS SSO sessions.

You can navigate this list using your keyboard arrow keys <kbd>↓</kbd> / <kbd>↑</kbd> and select the session you want to log into by pressing the <kbd>↩︎</kbd> key.

Once you've selected your session, you will be automatically logged in.

## 📝 License

Released under the [ISC license](https://tldrlegal.com/license/isc-license).

Inspired by the tool [`awsp`](https://github.com/johnnyopao/awsp).
