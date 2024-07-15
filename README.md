![MultiGame](https://github.com/user-attachments/assets/b5846ce6-409a-4b3d-8da1-a52b39bceba5)
# MultiGame
<table>
<tr>
<td>
  A cross-platform mobile application for Android and iOS featuring two standalone games: Drawing Guess and Spy Detection. These games involve creative drawing and word guessing, as well as inference challenges similar to the game Werewolf.
</td>
</tr>
</table>

## Demo 

### Authentication FaceID 
https://github.com/user-attachments/assets/aa281177-89c9-42be-a820-2176098600f9

### SpyGame 
https://github.com/user-attachments/assets/0b8c7af2-a802-4472-87b4-e4759fcd061b

### DrawingGame 
https://github.com/user-attachments/assets/fd2067f6-4ef7-4404-af3b-9878e138c7ae

## Features
| Feature | Description |
| --- | --- |
| 🎨 **Register, Login, Forget Password** | User authentication functionality. |
| 🧑‍💼 **Manage Player Accounts** | Allows players to manage personal information and log out. |
| 🏠 **Create, Join, and Find Rooms** | Players can create game rooms, search for, join existing rooms, and invite friends. |
| 🕹️ **Scoring, Timing, and Word Generation System** | Provides a scoring and timing system for games and a word generation function for the drawing guess game. |
| 📊 **Display Results** | Shows scores and notifications after each round, including results from the drawing guess and spy detection games. |
| 👍 **Interact with Other Players** | Allows players to like and connect with others after the game ends. |
| 💬 **In-game Chat** | Provides chat functionality between players in the same room or friends list. |
| 🛒 **Item Store and Backpack** | Players can purchase and store items like drawing backgrounds for the drawing guess game. |

## Installation

### Prerequisites
- Node.js
- npm or yarn
- Expo CLI

### Steps

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your-repo/project-name.git
    cd project-name
    ```

2. **File Structure**
    The project directory contains two folders: `client` and `server`.

3. **Start the Server**
    ```bash
    cd server
    npm start
    ```

4. **Build the Client (First Time Only)**
    If this is your first time running the project, you need to build the client before starting it. Follow the steps below:
    ```bash
    cd ../client
    ```
    4.1. For creating a production build of your Android app, run the following command:
    ```bash
    npx expo build:android
    ```
    4.2. For creating a production build of your iOS app, run the following command:
    ```bash
    npx expo build:ios
    ```
    Follow the instructions provided by Expo to complete the build process.

5. **Start the Client**
    After building the client for the first time, you can start it by running:
    ```bash
    npm start
    ```

6. **Deploy the App**
    You can deploy your app to app stores or via other deployment methods supported by Expo. For more details, refer to the [Expo documentation](https://docs.expo.dev/workflow/publishing/).

### Additional Tips
- For troubleshooting, refer to the [Expo documentation](https://docs.expo.dev/get-started/installation/) and [Node.js documentation](https://nodejs.org/en/docs/).
- Keep your dependencies up to date by running `npm update` or `yarn upgrade`.

## [Usage]
- **Register**: Create a new account or log in with an existing account.
- **Create/Join/Find Room**: Start a new game room, join an existing one, or find a room.
- **Play Games**: Enjoy the Drawing Guess and Spy Detection games with friends.
- **Invite Friends**: Invite friends to join your game room.
- **Chat**: Communicate with other players in the game room.
- **Score**: Track your performance and compare with friends.
- **Friends and Chat**: Make friends and chat with them outside of game rooms.

## Technologies Used 💻

- **JavaScript**
- **React Native**: For building the mobile application.
- **Expo**: For developing and deploying the app.
- **Node.js**: For backend services.
- **Express.js**: For server-side logic.
- **MongoDB**: For database management.
- **Socket.io**: For real-time communication.
- **AsyncStorage**: For local storage management.
- **Docker**: For containerization.
- **Azure**: For cloud services.
- **Blob Storage**: For storing game assets.

## Screenshots 📸

### Register and Login
<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/ab7ec712-6ef5-4a45-b93a-22a9f1109f4c" width="300"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/254824ea-7c19-4c62-a32a-e5ab8a0264bd" width="300"/>
    </td>
  </tr>
</table>

### Dashboard
<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/9ca0c01e-ec2f-450d-8c0f-27e91a869cb7" width="300"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/19e46217-ecc5-4009-b12c-f07d7592ee6a" width="300"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/e0f0e13e-995b-4772-8308-1e5b7dd94e79" width="300"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/4cdb44b8-cd0b-4690-b72a-799da5c0a97d" width="300"/>
    </td>
  </tr>
</table>

### Shop
<table>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/0d25285f-f2d4-4043-83f9-39be9a9fbaca" width="300"/>
      <br/>
      Giao diện Shop
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/7a2341d9-ef69-47d0-afcc-f2e8da462b02" width="300"/>
      <br/>
      Dialog mua vật phẩm ở shop - chưa mua
    </td>
  </tr>
</table>

### Profile
<table>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/f34db8be-d2a3-40b0-98f1-00f4e6ce7e56" width="300"/>
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/225b11a4-cab6-4870-a536-729f5279c88f" width="300"/>
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/76cb8e65-5bd9-4f3d-8c23-832fa0c7ede9" width="300"/>
    </td>
  </tr>
</table>

### Room Board
<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/1002348c-7145-4514-9e45-76d0d980bda4" width="300"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/9424151b-f8ea-4125-aac7-5162ae314e7b" width="300"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/dca648f8-5f2a-4dc5-9855-1b48ddd08f54" width="300"/>
    </td>
  </tr>
</table>

### Drawing Guess Game
<img src="https://github.com/user-attachments/assets/0558aff1-4ad5-41c7-8118-7e6694f69e99"/>
<table>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/fa8e914f-9f64-4297-8821-7a8326982303" width="300"/>
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/d66bfebb-e8dc-4481-99b3-ffa54e323c4e" width="300"/>
    </td>
  </tr>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/f6e8a9da-621e-445c-bb8d-15cc7e4ee77a" width="300"/>
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/c83a8708-b39e-4546-82a1-8b790be72874" width="300"/>
    </td>
  </tr>
</table>
<img src="https://github.com/user-attachments/assets/cdc75027-0221-488f-bbb2-f6524587e397"/>

### Spy Detection Game
<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/2238d023-4c14-4f16-afa0-6e3066c7441c" width="300"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/103df169-daca-46ab-93ab-ead782de7ddb" width="300"/>
    </td>
  </tr>
</table>
<img src="https://github.com/user-attachments/assets/45af94d5-d475-4279-bd14-3349d1c406d5"/>
<img src="https://github.com/user-attachments/assets/4214ba38-4704-46eb-8d46-e8366e8e7c4e"/>

### Chat Interface
<table>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/c33d3992-d357-4dad-ae70-333c35ce3480" width="300"/>
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/9b73a772-0783-47bd-91ed-a9f95dfc77e3" width="300"/>
    </td>
  </tr>
</table>

## Contributing 🤝

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request

## Bug / Feature Request 🐛✨

If you find a bug (the app couldn't handle the query and/or gave undesired results), kindly open an issue 2409huynhphat@gmail.com by including your query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue 2409huynhphat@gmail.com. Please include sample queries and their corresponding results.

## To-do 📝

- Add new game modes and features.
- Improve user interface and experience.
- Enhance real-time communication capabilities.
- Optimize game performance and stability.

## Team 👥

**Development Team**
- [Huynh Tien Phat](https://github.com/phathuynh24)
- [Nguyen Phuoc Thien](https://github.com/thienenpi)
- [Trần Tiến Phát](https://github.com/Phat7203)
- [Nguyen Truong Bao Duy](https://github.com/bduy1011)
