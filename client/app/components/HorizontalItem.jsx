import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles/horizontalItem.style";

const HorizontalItem = ({
  title,
  iconDesc,
  colorIconDesc,
  desc,
  colorDesc,
  iconRight,
  onPress,
  isCenter,
  isIconDesc,
  isAvt,
}) => {
  avatarSource = require("../../assets/bg01.png");

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={isCenter ? styles.centeredTitleContainer : styles.titleContainer}
      >
        <Text style={styles.title}>{title}</Text>
        {!isCenter && (
          <View style={styles.infoContainer}>
            {isIconDesc && (
              <Ionicons
                name={iconDesc}
                size={16}
                style={[styles.icon, { color: colorIconDesc, marginRight: 4 }]}
              />
            )}
            {isAvt && <Image source={avatarSource} style={styles.avatar} />}
            <Text style={[styles.desc, { color: colorDesc }]}>{desc}</Text>
            <Ionicons name={iconRight} size={16} style={styles.icon} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalItem;
