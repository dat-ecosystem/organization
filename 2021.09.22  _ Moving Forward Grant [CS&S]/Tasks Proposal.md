### 1. TRANSITION TASKS

**1.1. Blog**
- transition the blog from ghost

```
## 1.1. Dat-ecosystem blog setup

## task dependencies:
none

## todos:
- [ ] migration of the content
- [ ] make blog work as a Github page (not ghost)
- [ ] connect the new blog to dat-ecosystem domain (domain/blog)

## deliverables:
- https://dat-ecosystem.org/blog
- https:/github.com/dat-ecosystem/blog
- includes blog static or dynamic page template (using something)
- includes blog post content e.g. `/posts`
- includes `CNAME` file with `dat-ecosystem.org`

## estimated duration:
1 day

## estimated budget:
320 USD
```

**1.2. Identify all dat repositories and modules**

```
## 1.2.1 Making a list of repositories and modules

## task dependencies
none

## todos:
- [ ] find all relevant dat repositories (code, organization docs, documentation, tutorials, design...)
- [ ] find all different language implementations
- [ ] find all npm modules

## deliverables:
- list with links and maintainers split in 2 sections:
    - software and
    - maintainers (contact info)
    - organization (not code)

## estimated duration:
0.5 day * 8 * 40 = 160 USD


## estimated budget:
160 usd
```

**1.3. Archive *software* repositories and modules**
- criteria:
    - without maintainers
    - outdated
- deprecation notice
- link to new alternative (dat cli => hyp)

```
## 1.3.1 Transitioning repos to Dat-ecosystem

## task dependencies
- 1.2.1

## todos:
- [ ] reach out to the dat contributors (based on the list)
- [ ] figure maintainance status (info which project is still maintained and which not)
- [ ] ask maintainer about the successor for the unmaintained projects
- [ ] transition repos under Dat ecosystem Github & NPM

## deliverables:
- have all repos and modules under dat-ecosystem
- update list with maintainance status + new links to the repos and modules (under dat-ecosystem org) + successor (if exists)

## estimated duration:
1 Day

## estimated budget:
320 USD
```

```
## 1.3.2 Archiving Repos

## task dependencies
- 1.2.1
- 1.3.1

## todos:
- [ ] archive: add deprecation notice to unmaintained repositories & link to successor projects (if they exist) or to general tech overview

## deliverables:
- make all repos and modules have a deprecation notice if applicable
- include successor module/project link if applicable
- add a link to the official dat-ecosystem list of maintained modules

## estimated duration:
4 hours

## estimated budget:
160 USD
```

**1.4. Archive *organisational* repositories**

```
## 1.4.1 Transitioning repos to Dat-ecosystem

## task dependencies
- 1.2.1

## todos:
- [ ] reach out to the dat contributors (based on the list 1.2.1)
- [ ] transition repos under Dat ecosystem Github
  - criteria for organisational repo:
    - outdated documentation
    - code of conduct
    - project management repositories
    - design
- [ ] reach out to CS&S to link dat.foundation, dat.project, dat.land etc. to github page replacements (e.g. https://dat-ecosystem.org/dat.land/)
   - [ ] add CNAME files to github pages
   - [ ] reach out to CS&S to update domain A records to point to github

## deliverables:
- have all repos under dat-ecosystem
- update list(1.2.1) with new links to the repos and modules
- have old domains pointing to github pages

## Estimated duration:
1 Day

## Estimated budget:
320 USD
```

```
## 1.4.2 Archiving Org

## task dependencies:
- 1.4.1

## todos:
- [ ] design a deprecation notice (text & UI (simple html))
- [ ] add deprecation notice text to the repositories + link to the successor
- [ ] make all old webpages run as github pages
- [ ] add deprecation notice to the UI

## deliverables:
- make all repos and modules have a deprecation notice if applicable
- make all webpages have the deprecation notice

## estimated duration:
3 Days

## estimated budget:
960 USD
```


### 2. Dat-Ecosystem Bootstrap TASKS

Desired output example (at the end):
- https://github.com/ipfs/awesome-ipfs/issues/304
- https://ecosystem.ipfs.io/

### 2.1. Community Communication & Engagement Strategy

**2.1.1. Identify Audience**
- Categories: developers, projects (modules, companies..), financial supporters (grant programs, patrons...), media (bloggers, youtubers, podcasts...), friends (related communitites, organizations...)


```
## 2.1.1.1. Identify existing hypercore audience

## task dependencies

- 1.1
- 1.2
- 1.3
- 1.4

## todos:

- [ ] find projects, people, organizations related to hypercore protocol and the ecosystem (developers, projects (modules, companies..), financial supporters (grant programs, patrons...), media (tech bloggers, community newsletters, p2p tech social media creators (youtube, tiktok, twitch), podcasts...)
    - [ ] go through results of task dependencies (above)
    - [ ] visit old webpages (dat.foundation, dat.project, dat.land)
    - [ ] scan through the blog and outgoing links
    - [ ] go through the consortium mailing list
    - [ ] go through dat twitter
    - [ ] go through dat conference, data terra nemo and youtube talks
    - [ ] go through comm comm and consortium logs
    - [ ] identify friendly communities (ssb...)
    - [ ] go to chats (irc+old gitter, hyper discord, dat discord)
       - [ ] go through list of users
       - [ ] quick search for links and key phrases in chats to identify projects and interest groups
         - e.g. ('https', 'project', 'working on', ...other keywords to find them)

## deliverables:
- a list with: name, contact (email (optional, for future newsletters and dat ecosystem communication)), website, logo/avatar/profile pic, about/professional bio (related to p2p/hypercore + links), github (links to their p2p/hypercore related repos), location, language, yrs in the ecosystem
- tag each entry with the right category/ies
  -
## estimated duration:
3 days

## estimated budget:
960 USD

```

```
## 2.1.1.2. Dat Ecosystem Survey

## task dependencies
1.1, 1.2, 1.3, 1.4

## todos:

- [ ] make a survey on Google forms (or any other platform easy to use and to analyse data)
    - [ ] post survey periodically (at least 1 time per week for 1 month) on: irc+old gitter, hyper discord, dat discord, twitter, mailing list, friendly communities, ask people to share
    - [ ] analyse and make a list with results

## deliverables:
- a list with general info from the audience, ie: name, contact (email (optional, for future newsletters and dat ecosystem communication)), website, logo/avatar/profile pic, about/professional bio (related to p2p/hypercore + links), github (links to their p2p/hypercore related repos), location, language, yrs in the ecosystem,
- tag each entry with the right category/ies (developer or organisation or media or...)

## estimated duration:
1.5 days

## estimated budget:
480 USD

```

```
## 2.1.1.3. Project Section Content: Vizualize Dat ecosystem projects & modules

The goal is to have a well-looking, clear, big view of the ecosystem, its projects and members.

Some example/similar projects:

- https://twitter.com/n2ckchong/status/1373533273398243328
- https://ecosystem.ipfs.io/
- https://github.com/ipfs/awesome-ipfs/issues/304

## task dependencies
- 2.1.1.1 Identify audience
- 2.1.1.2. Dat Ecosystem Survey

## todos:
- [ ] Using previously collected projects and people information, categorize and organize the information as an infographic of the whole dat ecosystem.
- [ ] design a project card template per tier and website section template
- [ ] annotate each repo in the template with maintainer projects/people
- [ ] Finally add the section to the website

## deliverables:
- design template component for card and website section - SVG output desirable. This would help us to add future projects and/or persons to the ecosystem map.
- infographic asset of the whole dat-ecosystem with projects and important members. Ideally, projects and people should include logos and/or publicly available profile pictures. They should also contain important links (ie: projects links, websites, etc).


## estimated duration:
5 days

## estimated budget:
1600 usd
```

**2.1.2. Define communication goals, channels and strategy for each audience**

- Developers => Get more devs to be part of the dat-ecosystem
    - raise the awareness of the protocol and ecosystem as a garden
    - teaching
    - invite to try to build (hackathons...)
    - help them grow their ideas (mentorship)

- Projects (modules, companies..) => Start your own decentralized project and or collaborate with other existing projects and modules
    - help projects grow (co-marketing, free legal & business support, networking, fund raising)

- Financial supporters (grant programs, patrons...) => Make projects & ecosystem sustainable ($)
    - 1-on-1 relationship with grant programs/fundations to know about all open calls

- Media (tech bloggers, community newsletters, p2p tech social media creators (youtube, tiktok, twitch), podcasts...) => Get users and supporters for the projects and the ecosystem
    - PR relations: notify about news in the ecosystem
    - cross posting (guest writers)


**2.1.3. Action plan & maintain relationship & communication with identified audiences**

Awareness stage: tech articles
Interest stage: website
Consideration stage: chat
Intent stage: Online show & tell
Evaluation: Map/Comparison
Sold to Hypercore: Application to Dat ecosystem mentorship program

- interview series (video + publish as audio and written or just written interview)
    - how did they get introduced to Dat
    - what was their contribution
    - what did Dat mean to them then, how do they see it today
    - what are they doing today
    - any tips for dat-ecosystem
- review series
- projects' updates (playlists, quaterly blog updates)
- memes (entertainment/fun/sharable)
- events (hackathons, workshops, conferences, comm comms)


```
## 2.1.3.1 Technical articles

## task dependencies

## todos:
- [ ] prepare begginners/introductory/hands-on technical articles for medium, dev.to, nodeschool, etc. subsocial
    - based on https://hypercore-protocol.org/guides/walkthroughs)
- [ ] spread the articles on social media, chats, Reddit etc.
- [ ] add links to website, discord, twitter, ...

## deliverables:
- 5 technical articles

## estimated duration:
2
## estimated budget:
640
```


```
## 2.1.3.2 Newsletter - monthly digest & quaterly updates by projects

## task dependencies

## todos:
- [ ] adapt existing newsletter template
- [ ] prepare monthly summary of hypercore news (new projects, new updates etc.) in a shared hackmd where people can post news
  - inspiration: redecentralize digest + week in ethereum
- [ ] share on social media and send as newsletter and write a blog newsletter category post

## deliverables:
- 12 digests (with 4 extra quaterly deeper updates by projects)

## estimated duration:
4 days

## estimated budget:
1280

```

### 2.2. Prepare new dat-ecosystem website

**2.2.1. About dat-ecosystem**
    - ecosystem projects visualization
    - dat ecosystem garden: vision & mision:
        - https://hackmd.io/6T6MwxU8SSefMiQsusFVvg
        - https://hackmd.io/qVhO0vNsQle9fGFLdxOPfA
        - https://hackmd.io/6T6MwxU8SSefMiQsusFVvg
    - internal organization/governance
        - (consortium, manifesto, membership, digital tools)
        - social media
    - dat history

```
## 2.2.1.1 Copywrite content for Dat ecosystem as a decentralized garden: vision & mission section of the webpage

## task dependencies:
none

## todos:
- [ ] prepare content based on https://hackmd.io/6T6MwxU8SSefMiQsusFVvg

## deliverables:
- content for Dat ecosystem as a decentralized garden: vision & mision section

## estimated duration:
1 days
## estimated budget:
320 usd

```

https://hackmd.io/qVhO0vNsQle9fGFLdxOPfA

```
## 2.2.1.2 Copywrite content for History section of the page

## task dependencies:
none

## todos:
- [ ] review the history document (https://hackmd.io/cuolp56RRkmMNqr_6fIW1A)
    - link dat white paper
    - dat conferences
- [ ] add content to history section of the webpage

## deliverables:
- update history json file

## estimated duration:
1
## estimated budget:
320usd

```


```
## 2.2.1.3 Copywrite content for Organizational structure & governance (consortium, manifesto, membership)

## task dependencies:
- 2.2.1: to use the content on the website

## todos:
- [ ] describe ALL tools/app in official use and which organizational function is solved in the dat-ecosystem by using that tool
  - e.g. jitsi, discord/cabal, twitter, github org, blog, website, ...
- [ ] describe how people communicate and meet to make decisions
- [ ] describe and link to manifesto, code of conduct and other official docs on github markdown files in website repo
- [ ] describe any standard processes to join as a project or progress as a project through different stategs in the dat-ecosystem as a garden

## deliverables:
- have organizing structure and processes expressed and integrated into website https://dat-ecosystem.org
- have consortium structure expressed and integrated into website https://dat-ecosystem.org
- have a link to github manifesto.md added to website https://dat-ecosystem.org
- show projects and members profile on website https://dat-ecosystem.org

## estimated duration:
2
## estimated budget:
640 usd
```

```
## 2.2.1.4 Design and implement the final website
## task dependencies:
- 2.2.1.1
- 2.2.1.2
- 2.2.1.3
- 2.2.1.4

## todos:
- [ ] make concept for structure hierarchy of website content
- [ ] make design
- [ ] add content

## deliverables:
- design + wireframes/skeleton of website + navigation + project
- implement final website

## estimated duration:
7 days

## estimated budget:
2240
```

```
## 2.2.1.5 Projects of Dat Ecosystem
## task dependencies:

## todos:
- [ ] prepare custom questions for 3 minute compact project interview
    - goal: to get interesting short summary + future goal/steps
            for every project in dat-ecosystem
- [ ] reach out to projects in highest dat garden category
   - online video interview recorded by interviewer on jitsy/talky
   - walk through things upfront, so interviewee can prepare tabs
     - to screenshare (if necessary)
   - important: amazing sound quality
- [ ] outsource simple intro/outro for video series
   - to fiverr.com or friend
- [ ] edit video to add intro/outro & publish to youtube


## deliverables:
- 12x interview series on dat-ecosystem youtube
- video intro/outro for interview

## estimated duration:
24 + 4 hours

## estimated budget:
1200
```


---

### Timeline

There are 2 main aspects of this proposal:

* **Migration Tasks**
* **Dat Ecosystem bootstrap Tasks**

| Order                   | Tasks                         | ~Duration  | ~Budget   | Deps |
| ------------------------| ----------------------------- | ---------- | --------- | ---- |
|Total Grant              |                               |            |   $20000  |      |
|  - OC 10%               |                               |            | -  $2000  |      |
|  - Team Grant 25%       |                               |            | -  $4500  |      |
|  Total Grant Available  |                               |            |   $13500  |      |
|  - Reserve              |                               |            | -  $1580  |      |
|  Sub-Total              |                               | 49 Days    |   $11920  |      |
|   1                     | Migrational Tasks             | 10         | -  $2240  |  --  |
|   2                     | Dat Ecosystem Bootstrap Tasks | 39         | -  $9680  |   1  |
|                         |                               |            |           |      |
|                         |                               |            |           |      |

**We aim for this timeline:**
- July & August: grant team proposal preparation
- September: proposal review and adjustments
- October - December: execution