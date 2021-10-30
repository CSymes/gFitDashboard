# gFitDashboard

## Project Motivation

I was kinda miffed when Google [killed the web portal for Google Fit](https://9to5google.com/2019/02/21/google-fit-web-shutdown/) (*yet another product in a [long and varied history of such](https://killedbygoogle.com)*), and thought I would put my hand to hashing out a quick replica to do what I wanted to be able to do — namely view my data (*what's that I hear you say? Nah yeah, I actually don't want to do everything via my phone, would you believe it?*)


## The Death Knell

Really, I shouldn't have been surprised. It would have been too easy.

I've had this project in the back of my mind since the aforementioned death of the first-party equivalent, and then when I get into implementing it, lo-and-behold, a warning banner suddenly appears advising me that "*All scopes are currently sensitive but read scopes will become restricted later in 2021*"  
This means that you need to pass their screening and a third-party security audit before they'll authorise your application to read any data it hasn't itself written to the Fit API.

This is an understandable move from a cybersecurity standpoint, however, a [$15-75k USD](https://support.google.com/cloud/answer/9110914?hl=en#zippy=,security-assessment) security audit every year is a little out of the ballpark of the $0 budget I've allocated to this side project, so I won't be going to continue developing, or publicly host it (*although realistically speaking, it would likely never breach the [100 user cap](https://developers.google.com/fit/verification#what_do_the_review_enhancements_mean_in_practice) on being un-verified, so maybe I shouldn't stop...*)


## Using What's There:

### Configuration

To run this project, you will create a new project in the [GCP dashboard](https://console.cloud.google.com/apis/dashboard).  
You will then likely need to add yourself as a Test User (OAuth consent secreen in the left side panel)

Open the 'Library' panel, and search for 'Fitness API' and enable it.

Navigate to the 'Credentials' panel, and create a new set of credentials (OAuth client ID). Add `http://localhost:4200` as an authorised origin/redirect URL if you're going to be running off your local machine. Save your credentials, and then copy your Client ID and store your it in the `googleOauthClientId` field of your `environment.dev.ts`.


### Operation

This is a stock-standard Angular project (made using v12.2.0), so any of the usual suspect commands will work as expected. E.g.
* `ng serve` to run a dev server. Navigate to `http://localhost:4200/` to see the project running
* `ng build` to generate a distributable
