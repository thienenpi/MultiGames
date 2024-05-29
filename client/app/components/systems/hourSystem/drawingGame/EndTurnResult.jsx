// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   Pressable,
//   StyleSheet,
// } from "react-native";
// import { SIZES } from "../../../../constants";

// const KeywordSelection = ({ isShow, keywordList, onKeywordSelect }) => {
//   const [show, setShow] = useState(isShow);
//   const [randomKeyword, setRandomKeyword] = useState([]);

//   useEffect(() => {
//     setShow(isShow);
//   }, [isShow]);

//   useEffect(() => {
//     if (keywordList.length > 0 && randomKeyword.length === 0) {
//       const keywordSet = new Set();

//       while (keywordSet.size < 4 && keywordSet.size < keywordList.length) {
//         const randomWord = keywordList[Math.floor(Math.random() * keywordList.length)];
//         keywordSet.add(randomWord);
//       }
//       setRandomKeyword(Array.from(keywordSet));
//     }
//   }, [keywordList]);

//   // const closeModal = () => {
//   //   setShow(false);
//   // };

//   const handleKeywordPress = (keyword) => {
//     onKeywordSelect(keyword);
//     // closeModal();
//   };

//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={show}
//       // onRequestClose={closeModal}
//     >
//       <Pressable style={styles.overlay}/>
//       <View style={styles.modalView}>
//         {randomKeyword.map((keyword, index) => (
//           <TouchableOpacity key={index} onPress={() => handleKeywordPress(keyword.keyword)}>
//             <Text>{keyword.keyword}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </Modal>
//   );
// };

// export default KeywordSelection;

// const styles = StyleSheet.create({
//   overlay: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },

//   modalView: {
//     top: SIZES.height / 4,
//     bottom: SIZES.height / 4,
//     left: SIZES.width / 9,
//     right: SIZES.width / 9,
//     backgroundColor: "white",
//     alignItems: "center",
//     borderRadius: 10,
//     position: "absolute",
//     padding: 20,
//   },
// });
