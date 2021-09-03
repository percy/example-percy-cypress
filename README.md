# example-percy-cypress

Example app demonstrating Percy's Cypress integration, used in [Percy's Cypress tutorial](https://docs.percy.io/docs/cypress-tutorial).

Based on the [TodoMVC](https://github.com/tastejs/todomvc) [VanillaJS](https://github.com/tastejs/todomvc/tree/master/examples/vanillajs)
app, forked at commit
[4e301c7014093505dcf6678c8f97a5e8dee2d250](https://github.com/tastejs/todomvc/tree/4e301c7014093505dcf6678c8f97a5e8dee2d250).

## Cypress Tutorial

The tutorial assumes you're already familiar with JavaScript and
[Cypress](https://cypress.io/) and focuses on using it with Percy. You'll still
be able to follow along if you're not familiar with Cypress, but we won't
spend time introducing Cypress concepts.

The tutorial also assumes you have [Node 12+ with
npm](https://nodejs.org/en/download/) and
[git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.

### Step 1

Clone the example application and install dependencies:

```bash
$ git clone https://github.com/percy/example-percy-cypress.git
$ cd example-percy-cypress
$ npm install
```

The example app and its tests will now be ready to go. You can explore the app
by opening the
[`index.html`](https://github.com/percy/example-percy-cypress/blob/master/index.html)
file in a browser.

### Step 2

Sign in to Percy and create a new project. You can name the project "todo" if you'd like. After
you've created the project, you'll be shown a token environment variable.

### Step 3

In the shell window you're working in, export the token environment variable:

**Unix**

``` shell
$ export PERCY_TOKEN="<your token here>"
```

**Windows**

``` shell
$ set PERCY_TOKEN="<your token here>"

# PowerShell
$ $Env:PERCY_TOKEN="<your token here>"
```

Note: Usually this would only be set up in your CI environment, but to keep things simple we'll
configure it in your shell so that Percy is enabled in your local environment.

### Step 4

Check out a new branch for your work in this tutorial (we'll call this branch
`tutorial-example`), then run tests & take snapshots:

``` shell
$ git checkout -b tutorial-example
$ npm run test
```

This will run the app's Cypress tests, which contain calls to create Percy snapshots. The snapshots
will then be uploaded to Percy for comparison. Percy will use the Percy token you used in **Step 2**
to know which organization and project to upload the snapshots to.

You can view the screenshots in Percy now if you want, but there will be no visual comparisons
yet. You'll see that Percy shows you that these snapshots come from your `tutorial-example` branch.

### Step 5

Use your text editor to edit `index.html` and introduce some visual changes. For example, you can
add inline CSS to bold the "Clear completed" button on line 32. After the change, that line looks
like this:

``` html
<button class="clear-completed" style="font-weight:bold">Clear completed</button>
```

### Step 6

Commit the change:

``` shell
$ git commit -am "Emphasize 'Clear completed' button"
```

### Step 7

Run the tests with snapshots again:

``` shell
$ npm run test
```

This will run the tests again and take new snapshots of our modified application. The new snapshots
will be uploaded to Percy and compared with the previous snapshots, showing any visual diffs.

At the end of the test run output, you will see logs from Percy confirming that the snapshots were
successfully uploaded and giving you a direct URL to check out any visual diffs.

### Step 8

Visit your project in Percy and you'll see a new build with the visual comparisons between the two
runs. Click anywhere on the Build 2 row. You can see the original snapshots on the left, and the new
snapshots on the right.

Percy has highlighted what's changed visually in the app! Snapshots with the largest changes are
shown first You can click on the highlight to reveal the underlying screenshot.

If you scroll down, you'll see that no other test cases were impacted by our changes to the 'Clear
completed' button. The unchanged snapshots appear grouped together at the bottom of the list.

### Finished! 😀

From here, you can try making your own changes to the app and tests, if you like. If you do, re-run
the tests and you'll see any visual changes reflected in Percy.
