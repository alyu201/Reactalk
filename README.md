<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<hr />
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center" >Reactalk</h3>
  <a href="#-getting-started"><strong>Getting started</strong></a>
  .
  <a href="#how-to-use-reactalk"><strong>How to use Reactalk</strong></a>
  <br /><br />

  <h4>Welcome to Reactalk!</h4>

  <p align="justify">
    Reactalk is a VSCode extension that serves as a voice programming tool, aka. You can code using your voice. 
    We have a wide selection of commands available and they come under 4 categories: 
Composition, Editing, Navigation and System.
  </p>
</div>

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li>
          <a href="#prerequisites">Prerequisites</a>
          <ul>
            <li><a href="#software">Software</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#hardware">Hardware</a></li>
          </ul>
        </li>
        <li><a href="#setup-and-run-reactalk-for-development">Setup and run Reactalk for development</a></li>
        <li><a href="#package-reactalk-as-a-vsix-extension-file">Package Reactalk as a .vsix extension file</a></li>
        <li><a href="#install-and-run-reactalk-as-an-extension-locally">Install and run Reactalk as an extension locally</a></li>
      </ul>
    </li>
    <li><a href="#how-to-use-reactalk">How to use Reactalk</a></li>
  </ol>
</details>
<hr />

<!-- GETTING STARTED -->

## 📋 Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

#### Software
1. [Node v14.0](https://nodejs.org/en/) or above
```sh
npm install npm@latest -g

# check for node version >14
node --version
```
2. [VSCode](https://code.visualstudio.com/)
3. [SoX v14.4.1](https://www.npmjs.com/package/sox) (for Windows users)

#### Services
1. Setup a Google Cloud project by following the steps outlined [here](https://cloud.google.com/speech-to-text/docs/before-you-begin) (Note: this will require a billing account for the Google Cloud service). Store the google credentials file for the Google Cloud project somewhere safely

#### Hardware
1. Desktop USB microphone (recommended)
2. Laptop/PC

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Setup and run Reactalk for development

1. Clone the repository to your local machine

```sh
 git clone https://github.com/alyu201/Reactalk.git
```
2. Set the Google Cloud project credentials as an environment variable
  - Windows:
    - Add the `GOOGLE_APPLICATION_CREDENTIALS` env variable with the path to the credential keys json file as the value using the `env` field in the `launch.json` file in the `.vscode` folder.
    ![image](https://user-images.githubusercontent.com/68038316/196586241-30f4c775-594c-4a34-9101-6cc586e3675f.png)
  - Mac:
    - When setting up the environment variables for Mac, it is better to set the environment varaible in the shell startup file (for example in the `~/.bashrc` or `~/.profile` file) so that the variable can be applied in future shell sessions.
    ![image](https://user-images.githubusercontent.com/68038316/196586410-17bd49b6-97ce-4858-a462-267bb18bcfd9.png)
3. Ensure you are at the root directory
4. Run `npm install` on your terminal to install the required node dependencies.
```sh
npm install
```
5. Due to issues with `node-record-lpcm16` package, the `index.js` file of the package needs updating. Go to `node_modules/node-record-lpcm16/recorders/index.js` and on line 5, change the `return require(...)` to return `require(`./${recorderName}`)` instead

6. Build and start the extension in an Extension Development Host window by pressing the `F5 key`

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Package Reactalk as a .vsix extension file
1.	Follow the steps specified in [Setup and run Reactalk for development](#setup-and-run-reactalk-for-development) to clone and setup the project.
2.	Install the `vsce` command-line tool to package Reactalk by executing the following in the terminal. More information can be found [here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).
```sh
npm install -g vsce
```
3. Package Reactalk as an extension by executing the following in the terminal. This should produce a Reactalk extension `.vsix` file named `reactalk-0.0.1.vsix` in the root directory.
```sh
$ cd myExtension
$ vsce package
# myExtension.vsix generated
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Install and run Reactalk as an extension locally
1.	Follow the instructions in the [Package Reactalk as a .vsix extension file](#package-reactalk-as-a-vsix-extension-file) section to produce a `.vsix` file.
2.	To install and run Reactalk as an extension, navigate to the ‘Extensions’ tab of the sidebar in VSCode.

  ![image](https://user-images.githubusercontent.com/68038316/196588503-b14b9cde-17a3-4a46-bd4c-3147afd69c45.png)
  
3.	Click on the three dots located at the top right side and click on 'Install from VSIX'.

  ![image](https://user-images.githubusercontent.com/68038316/196588538-88cefc92-e947-476e-893b-987d0b5a8666.png)
  
4.	A file explorer dialogue will appear for choosing the `.vsix` file to install. Locate the `reactalk-0.0.1.vsix` file and press ‘install’.

  ![image](https://user-images.githubusercontent.com/68038316/196588633-4a53eb65-a00f-4809-9d88-cf7c9aa7e653.png)
  
5.	Reactalk is now installed as an extension locally and a new extension will appear in the sidebar of VSCode. If the displayed extension does not show up, have a look at the secondary sidebar or the toggle panel.
 
  ![image](https://user-images.githubusercontent.com/68038316/196588780-c5cd2ae5-008f-4429-996d-90d1051bd0d7.png)
  
6. To use Reactalk, refer to the [How to use Reactalk](#how-to-use-reactalk) section below for more details. 


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- HOW TO USE REACTALK -->

## How to use Reactalk
1.	Ensure that you have a microphone available. This can be the system’s existing microphone or a USB plugin microphone.
2.	Open up Reactalk. Ensure that the extension is installed and enabled. To install and setup Reactalk as an extension on your machine locally, follow the steps in the [Install and run Reactalk as an extension locally](#install-and-run-reactalk-as-an-extension-locally) section of the Compendium/Documentation/Setup and run Reactalk.docx file

![image](https://user-images.githubusercontent.com/68038316/196589888-e3bef8dd-18c8-4b14-8f00-e0d7b4d27ba4.png)

3.	You should see the setup from the Recommended setup section above. If not, refer to this section above to adjust.
4.	Click the start button (represented by the microphone icon) to begin speaking.

  ![image](https://user-images.githubusercontent.com/68038316/196589905-7db32e8c-9dc9-4452-bd93-d3d64be7f7ba.png)

  - This should change the status to ‘started’:
  
  ![image](https://user-images.githubusercontent.com/68038316/196589934-7876528b-f8df-46e6-bf42-6a0e68f07533.png)

5.	Begin talking! And the transcript should appear. For example, saying “go up” would produce this:
  
  ![image](https://user-images.githubusercontent.com/68038316/196589950-e302367c-be40-4e8c-bc04-a4ff68e1031b.png)

6.	To stop Reactalk, say ‘stop listening’:
  
  ![image](https://user-images.githubusercontent.com/68038316/196589969-e50b38c7-a474-4d66-b17d-1e6a3f5532c9.png)




<p align="right">(<a href="#readme-top">back to top</a>)</p>
