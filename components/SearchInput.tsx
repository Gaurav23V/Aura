import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert, StyleSheet } from "react-native";
import { icons } from "../constants";
import { colors, fontFamilies } from "../app/styles/globals";

const SearchInput = (initialQuery) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.textInput}
        value={query}
        placeholder={"Search for a video topic"}
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please input something to search result across database")
          }
          if (pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
      >
        <Image
          source={icons.search}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 64, // equivalent to h-16
    paddingHorizontal: 16, // equivalent to px-4
    backgroundColor: colors.black[100], // bg-black-100
    borderRadius: 16, // rounded-2xl
    borderWidth: 2,
    borderColor: colors.black[100], // border-black-200
  },
  containerFocused: {
    borderColor: colors.secondary[200], // border-secondary
  },
  textInput: {
    fontSize: 16,
    marginTop: 1,
    color: "#FFFFFF",
    flex: 1,
    fontFamily: fontFamilies.pregular,
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default SearchInput;
