# DNS preparation — not applied

Resend domain `erledigt-team.de` was added in Ireland (eu-west-1) on 8 October 2026.
The dashboard displayed the following sender-verification records:

| Type | Host | Value |
| --- | --- | --- |
| TXT | resend._domainkey | p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDxsQyFM1KHh71MYH4KKFhVWWktNq50ydR1sewenzA5uX7Zu4J42BzF8cVI3b5iXl2frl1Jlk5cLIJqJmoZtqnWnFDJWGr8CihztChu7UgBm+VdyNCfOAZ42LVz7PaM/HHv6amNqiuPYYqCwLJCt6czOmLuH4OxF8IznYvROYNuwIDAQAB |
| CNAME | rsend | rsend-euw1.forge.rmta.net |
| CNAME | send | send.forge.rmta.net |

These are public DNS verification values, not API secrets. Re-read the current provider page before
applying them. No DNS changes or verification claim have been made; checkdomain currently requires
login. Preserve the domain's existing MX/SPF/DMARC records. Receiving in Resend is disabled; the
business info mailbox must remain with its intended mailbox provider. Inspect and disable sender
click/open tracking if not needed for internal notifications. Do not overwrite an existing DMARC
policy with the optional `p=none` suggestion without understanding its current policy.

Read Vercel's actual domain page for its current root/www records after restoring access to the
correct project. Do not substitute guessed IP addresses or CNAME values.
