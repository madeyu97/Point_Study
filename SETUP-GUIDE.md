# Point Study — Setup Guide

Getting accounts, sync and colleagues working, then getting it ready to sell.

Work through Part 1 in one sitting — about forty minutes, all free. Parts 2 and 3 can wait.

---

# Part 1 — Make it work

Nothing in the app's social side does anything until this is done. That's why you haven't seen a username prompt: the app checks whether it has database keys, finds none, and stays quiet.

The order matters. Each step depends on the one before it.

## Step 1 — Set up email sending

Supabase needs a way to email sign-in codes. Its built-in sender won't let you customise the email, and you need to, so use Resend. It's free for 3,000 emails a month.

1. Go to **resend.com** and sign up.
2. In the left menu, click **API Keys**, then **Create API Key**. Name it "supabase" and give it sending access.
3. Copy the key. It starts with `re_`. Keep it somewhere for the next step.

You don't need to verify a domain yet. Resend lets you send from `onboarding@resend.dev` straight away, which is fine for you and your testers.

## Step 2 — Connect Resend to Supabase

1. Go to **supabase.com** and open your project (or create one — it's free).
2. Left menu: **Project Settings** → **Authentication**.
3. Find **SMTP Settings** and turn on **Enable Custom SMTP**.
4. Fill in:
   - Host: `smtp.resend.com`
   - Port: `465`
   - Username: `resend`
   - Password: your `re_` key from Step 1
   - Sender email: `onboarding@resend.dev`
   - Sender name: `Point Study`
5. Save.

## Step 3 — Make the email contain a code

The app asks people for a six-digit code. By default Supabase sends a link instead, which is what sent you to `localhost:3000` last time.

1. Left menu: **Authentication** → **Email Templates**.
2. Choose the **Magic Link** template.
3. Replace the body with this:

```html
<h2>Your Point Study sign-in code</h2>
<p>Enter this code in the app:</p>
<p style="font-size:28px;letter-spacing:4px;font-weight:bold">{{ .Token }}</p>
<p>It expires in 60 minutes.</p>
```

4. Save.

`{{ .Token }}` is the code. That one line is the whole point of this step.

While you're in Authentication, click **URL Configuration** and set the Site URL to `https://point-study.netlify.app`. That stops any stray links pointing at localhost.

## Step 4 — Build the database

1. Left menu: **SQL Editor** → **New query**.
2. Open `setup-database.sql` from your app folder, copy all of it, paste it in.
3. Click **Run**.

You should see "Success. No rows returned." That's it — four tables with security rules that make sure nobody can read anyone else's data.

## Step 5 — Give the app its keys

1. In Supabase: **Project Settings** → **API**.
2. Copy the **Project URL** and the **anon public** key.
3. Open **`config.js`** — a small file, nothing else in it — and paste them in:

```js
window.CONFIG = {
  SUPABASE_URL: 'https://yourproject.supabase.co',
  SUPABASE_ANON: 'eyJhbGciOi...'
};
```

Save it.

These two values are meant to be public — the security lives in the database
rules, not in hiding the keys. Never put the `service_role` key here.

**Why a separate file:** app updates replace `index.html` and `sw.js`. They
never touch `config.js`, so your keys survive every future update. Edit it
once and forget it.

**This is the step that switches everything on.** Until those quotes have
something in them, sync and colleagues stay invisible.

## Step 6 — Deploy

1. Go to **github.com/madeyu97/Point_Study**.
2. **Add file** → **Upload files**.
3. Drag in `index.html`, `sw.js` and `config.js`.
4. Write a commit message and click **Commit changes**.

Netlify rebuilds within seconds. Watch the Deploys tab until it goes green.

**From now on, updates are only `index.html` and `sw.js`.** Leave `config.js`
alone — that's the file holding your keys.

## Step 7 — Sign in

1. Open the app and close it completely, then open it again. The new version only takes over on a fresh launch.
2. Tap **設** → **Account & sync**.
3. Enter your email, tap **Email me a code**.
4. Check your inbox for a six-digit number and type it in.

Your progress now backs itself up automatically.

**Test it properly:** study a few cards, then clear the app's site data — the thing that used to wipe everything. Reopen, sign in again, and watch your streak come back.

## Step 8 — Claim your username

Open the mode library at the bottom of the home screen ("All 17 modes"), find **Colleagues 同道** under Reference, and pick a username. Lowercase letters, numbers and underscores, three to twenty characters.

That's Part 1 done.

---

# Part 2 — Add your testers

Nothing extra to set up. Everyone signs in the same way you did.

Send each person the URL, and tell them:

1. Open the link in Safari or Chrome, then add it to your home screen (Share → Add to Home Screen on iPhone; the three-dot menu → Install on Android).
2. Open Settings → Account & sync, enter your email, type in the code.
3. Open Colleagues and pick a username.
4. Tell me your username so I can connect with you.

Then in Colleagues, type their username and send a request. They accept, and you'll each see the other's streak, level, mature points, honours and weekly review count. Star someone with ☆ and they show up on your home screen.

**Watch your Resend usage** while testing. A hundred emails a day is the free limit, which is generous for a handful of people but worth knowing.

**Ask testers for specific things.** "Let me know what you think" gets you nothing. Ask: did any card show wrong information? Did anything confuse you on first opening it? Did you actually use it more than twice? That last one tells you the most.

---

# Part 3 — Make it sellable

Everything here is built and waiting. This part is setup, not development.

The model: **the app studies offline for free; a licence unlocks cloud backup, syncing and colleagues.** People can try it properly before paying, and what they pay for is the thing that actually costs you money to run.

## Step 9 — Create the product on Gumroad

1. Sign up at **gumroad.com** and click **New product**. Choose **Digital product**.
2. Name and price it. **[Something like £15–25 works for a student tool.]**
3. Under **Content**, don't upload a file — put the app's URL and a short "how to get started" note instead.
4. Open **Settings** on the product and turn on **Generate a unique licence key per sale**.
5. That same panel shows your **Product ID**. Copy it.

Gumroad emails each buyer their key automatically.

## Step 10 — Set up the activation function

The app folder now has `netlify/functions/activate.js`. It checks a licence with Gumroad and records it. It must run on a server, because a check written into the app could simply be deleted by anyone who opens the file.

1. Upload the whole `netlify` folder and `netlify.toml` to your GitHub repo. On GitHub's uploader, folders flatten — so use **Add file → Create new file**, type `netlify/functions/activate.js` as the filename (typing each `/` creates a folder), and paste the file's contents in.
2. In Netlify: **Site configuration → Environment variables**, and add three:

   - `GUMROAD_PRODUCT_ID` — the Product ID from Step 9
   - `SUPABASE_URL` — the same URL you put in `index.html`
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase → Settings → API → **service_role**

   That third one is a **secret**. It bypasses every security rule in your database. It belongs only here, never in `index.html`, never in GitHub, never in a message to anyone.

   Optionally add `LICENCE_SEATS` (default 3) to change how many accounts one key may activate.

3. **Deploys → Trigger deploy → Deploy project without cache.** Environment variables only reach a build that happens after you add them.

## Step 11 — Turn the gate on

If you ran `setup-database.sql` before this guide existed, run it again — it now includes the `licences` table and the rules that require one. It's safe to re-run.

After it runs, saving progress, claiming a username, sending connection requests and publishing your stats all require a licence row. That row can only be written by the activation function.

This is what makes the gate real. Someone can edit the app to skip the licence screen and it changes nothing, because Supabase refuses to store their data.

## Step 12 — Give yourself and your testers free access

You don't need to buy your own product, and neither do your testers.

Once someone has signed in at least once, run this in Supabase → **SQL Editor**, changing the email:

```sql
insert into licences (user_id, licence_key, email)
select id, 'OWNER', email from auth.users
where email = 'them@example.com'
on conflict (user_id) do nothing;
```

Reopen the app and the licence screen is gone.

To see who has access:

```sql
select email, licence_key, activated_at from licences;
```

To take it away:

```sql
delete from licences
where user_id = (select id from auth.users where email = 'them@example.com');
```

## Step 13 — Test a real purchase

Before announcing anything, buy your own product once. Gumroad lets you make a discount code for 100% off — create one, use it, and go through exactly what a customer does:

Buy → receive the key by email → open the app → sign in → paste the key → watch sync switch on.

If that works end to end, you have a product. If it doesn't, you've found out for £0 rather than in front of a customer.

## Step 14 — Publish your privacy policy and terms

`PRIVACY-AND-TERMS.md` in your app folder has both, drafted for exactly this app — what you store, what colleagues can see, how someone deletes their account, what the refund window is, and a clear statement that this is a study aid rather than a clinical reference.

Read them properly and replace every **[SQUARE BRACKET]**. Publish them somewhere public and link both from the Gumroad page above the buy button.

I'm not a lawyer, and these are drafts. Once you're taking money from people in the UK or EU you're a data controller with real obligations, so an hour with a solicitor before you launch is money well spent.

## Step 15 — Decide the age question

You're selling to students, and some may be under 18. That matters for data protection.

The simplest answer, and the one the draft terms take, is to require buyers to be 18 or over. Say it plainly on the product page and in the terms.

Having no messaging in the app already removes the largest risk here. But storing a minor's data still carries rules you'd rather not be quietly breaking.

## What it costs to run

Free until you have real numbers. Supabase's free tier covers 50,000 monthly active users and 500MB — each person's progress is a few kilobytes, so that's thousands of customers. Netlify and Resend are free at your scale. Gumroad takes a percentage of each sale.

The first bill only arrives when you're already earning.

## Honest limits of the licence gate

The database rules are solid: without a licence row, nothing is stored, and only the server can create one.

What no key system can prevent is a buyer handing their key to a friend. The seat limit caps that at 3 accounts per key, which stops a key being posted publicly, but two students sharing one purchase will work. Gumroad's own licence API has no device binding, so this is a limit of the tool rather than something I can code around.

For a study app at this price, seat limits and goodwill are the proportionate answer. Chasing further would cost you more than the lost sales.

# When something goes wrong

**No sign-in code arrived.** Check spam first. Then check that Custom SMTP is on in Supabase, and that the Magic Link template contains `{{ .Token }}`. Codes expire after an hour, so request a fresh one.

**Colleagues says sync isn't configured.** The two keys in `index.html` are still empty, or you haven't deployed since filling them in.

**Signed in but nothing syncs.** Check the SQL ran — Supabase → Table Editor should list `progress`, `profiles`, `connections` and `stats`.

**A tester can't find you by username.** Both of you need to have claimed one. Usernames are always lowercase.

**The app looks like the old version.** Close it completely and open it again.

---

# What you can ignore

The AI tutor was removed along with the Clinic mode. If your GitHub repo still
contains `netlify/functions/tutor.js` or `SETUP-AI-TUTOR.txt`, delete them —
nothing uses them. Delete the `GEMINI_API_KEY` variable in Netlify too, and
revoke that key in Google AI Studio.

Keep `netlify/functions/activate.js`. That one is the licence checker and it is
very much in use.
