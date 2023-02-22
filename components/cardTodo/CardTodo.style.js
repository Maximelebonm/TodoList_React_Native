import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    borderRadius: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: "#ABABAB",
  },
  icone: {
    height: 50,
  },
});
