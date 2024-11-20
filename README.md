# Send to Print

This is the Boston Globe's implementation of the Send to Print integration. This integration listens for the `composer:send_to_print` event and sends the story to the print service.

It's a fork of example code provided by Arc XP. The original README is below.

---

Example code is provided by a community of developers. They are intended to help you get started more quickly, but are not guaranteed to cover all scenarios nor are they supported by Arc XP.

> These examples are licensed under the [MIT license](https://mit-license.org/): THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Reiterated from license above, all code in this example is free to use, and as such, there is NO WARRANTY, SLA or SUPPORT for these examples.

## Description
This example code can be used as a starting point for integrating with an external print service. When the event is recieved from Composer, it contains a story ID. Using this ID, get the full ANS from Draft API, then format the data as needed and send it off to the print service. Since all services differ, this example code does not include formatting, but provides a way for you to quickly get up and running.

## Building your integration

### Prerequisites
You will need to set up some variables such as your organization's API URLs and your access tokens.

1. Create a personal access token with `read:package` scope in your GitHub account. See ["Creating a personal access token."](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

2. Once a PAT is created, there are two ways to install the Node.js SDK dependency. The first option is to create your local .npmrc file directly. Another option is to use npm login command.

    - Create your local .npmrc file directly
      ```
      export GITHUB_TOKEN=<your PAT generated through the GitHub console>
      npm config set @arcxp:registry=https://npm.pkg.github.com/
      echo '//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}' >> ~/.npmrc
      ```
    - Use `npm login`
      ```
      npm login --scope=@arcxp --auth-type=legacy --registry=https://npm.pkg.github.com
     
      Username: your GitHub username
      Password: your PAT generated through the GitHub console
      Email: your GitHub email
      ```

### Installation


1. Install NPM packages
   ```
   npm install
   ```
2. Optional: Reset NPM configuration
   ```
   npm config delete @arcxp:registry
   npm logout --registry=https://npm.pkg.github.com/
   ```


## Running your Integration

If all succeeded, then you can run:
```
npm run localTestingServer
```


## Configuration


### Environment Files

Utilize the `.env.{my-environment}` files in the root directory to provide environment specific
configuration to your application. Do not store secrets or api keys in these files, for those see [Secrets](#secrets)


### Secrets
Secrets are managed via the Arc Admin API. Secrets that you add to your integration via that API get placed as environment variables available to your application on the `process.env` object.

To test secrets while running the local development server, you should create a file called `.env` in
the root directory of your project and store them there. **Note: This file containing secrets should NOT be committed to version control.**

## Moving your Integration from local to IFX
In IFX, code is zipped, uploaded, deployed, and promoted.

A nominal deploy process looks as follows:

     │ Bundle ├───────►│ Upload ├──────►│ Deploy ├─────►│ Promote │

You can find more information in ALC: [Bundle Deployment Workflow](https://docs.arcxp.com/alc/en/bundle-deployment-workflow?sys_kb_id=24f19bb687b48210637f315d0ebb355d&id=kb_article_view&sysparm_rank=14&sysparm_tsqueryId=2ed0645947419650a87626c2846d43f3)

### Bundling your code
Once your code is tested locally, it can be bundled into a zip file for uploading to IFX.
```
npm run build
npm run zip
```

### Uploading your bundle
After bundling, upload your bundle to IFX.
```
curl -X POST \
 --location 'https://api.{:org}.arcpublishing.com/ifx/api/v1/admin/bundles/:integrationName' \
 --header 'Authorization: Bearer ' \
 -F 'name=myIntegration-1-1-0' \
 -F 'bundle=@/path/to/zip/myIntegration.zip;type=application/zip'
```

### Deploying your bundle
Once your zip is uploaded, it must be deployed into the IFX framework. This is a discrete step from uploading, as some uploaded bundles may not need to be used or are immediately replaced.
```
POST /ifx/api/v1/admin/bundles/{integrationName}/deploy/{bundleName}
```

### Promoting your bundle
After deploying, your code will be ready to handle invocations, but it is not yet set to be used by default (referred to as being "live").  Promoting your bundle will set it to be the "live" version of your integration that will be invoked.
```
POST /ifx/api/v1/admin/bundles/{integrationName}/promote/{version}
```

### Subscribing to events
Your integration will not be invoked unless you are subscribed to the desired events. Once deployed and promoted, you can subscribe to the `composer:send_to_print` event. You can find more information about this on the [IFX Events](https://docs.arcxp.com/alc/en/ifx-events?id=kb_article_view&sys_kb_id=526d6dcf47841610a87626c2846d4382) page.
