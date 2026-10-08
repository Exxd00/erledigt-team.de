# DNS status — 8 October 2026

Resend domain `erledigt-team.de` was added in Ireland (eu-west-1) on 8 October 2026.
The dashboard displayed the following sender-verification records:

| Type  | Host               | Value                                                                                                                                                                                                                      |
| ----- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TXT   | resend.\_domainkey | p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDxsQyFM1KHh71MYH4KKFhVWWktNq50ydR1sewenzA5uX7Zu4J42BzF8cVI3b5iXl2frl1Jlk5cLIJqJmoZtqnWnFDJWGr8CihztChu7UgBm+VdyNCfOAZ42LVz7PaM/HHv6amNqiuPYYqCwLJCt6czOmLuH4OxF8IznYvROYNuwIDAQAB |
| CNAME | rsend              | rsend-euw1.forge.rmta.net                                                                                                                                                                                                  |
| CNAME | send               | send.forge.rmta.net                                                                                                                                                                                                        |

These are public DNS verification values, not API secrets. Re-read the current provider page before
applying them. These three sender records remain prepared, not applied. Checkdomain access was restored
on 8 October 2026. Preserve the domain's existing MX/SPF/DMARC records. Receiving in Resend is disabled; the
business info mailbox must remain with its intended mailbox provider. Inspect and disable sender
click/open tracking if not needed for internal notifications. Do not overwrite an existing DMARC
policy with the optional `p=none` suggestion without understanding its current policy.

## Applied Vercel website records

The root and www domains were added to `erledigt-teamde/erledigt-team.de` on 8 October 2026.
The root is connected to Production. The www hostname uses a 308 redirect to `erledigt-team.de`.
Both show **Valid Configuration**. These changes were saved in checkdomain and verified through
public DNS:

| Type  | Host | Value shown in Vercel                |
| ----- | ---- | ------------------------------------ |
| A     | @    | 216.198.79.1                         |
| CNAME | www  | 01bb5a1801a86b7b.vercel-dns-017.com. |

The previous root A and conflicting AAAA were replaced/removed. Checkdomain's automatic www alias
was disabled so the explicit www CNAME can apply. Existing checkdomain nameservers and mail records
were preserved. No hosting subscription or paid Vercel upgrade was made.

## Existing public mail routing observed on 8 October 2026

| Type | Host | Existing value to preserve                                   |
| ---- | ---- | ------------------------------------------------------------ |
| MX   | @    | erledigtteam-de02b.mail.protection.outlook.com (priority 10) |
| TXT  | @    | v=spf1 include:spf.protection.outlook.com -all               |

Public DNS points to Microsoft 365. The individual `info@erledigt-team.de` mailbox remains
unconfirmed, and no test email has been sent. The root A record now returns `216.198.79.1`.
The three Resend verification records above returned no matching public answers. Do not replace
the Microsoft 365 MX/SPF records with Resend receiving records.
