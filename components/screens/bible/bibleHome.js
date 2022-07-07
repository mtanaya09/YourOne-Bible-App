import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BibleHeader, BibleItem, bookList } from "../../bible";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

const BibleHome = () => {
  const [bookMode, setBookMode] = useState(0); //0 for all books, 1 for old and 2 for new
  const [books, setBooks] = useState(bookList);
  const [searchList, setSearchList] = useState(books);
  const [textFilter, setTextFilter] = useState("");

  const renderBooks = ({ item }) => (
    <View style={styles.bookChapterContainer}>
      {/* for displaying book icon */}
      
      <BibleItem item={item} />
    </View>
  );
  const onFilterSelected = (mode) => {
    if (mode == bookMode) {
      setBookMode(0);
      setBooks(bookList);
      //reset book mode when selected again
    } else {
      switch (mode) {
        case 1:
          setBookMode(1);
          setBooks(bookList.slice(0, 38));
          break;
        case 2:
          setBookMode(2);
          setBooks(bookList.slice(39, 66));
          break;
      }
    }
  };
  const searchBook = (input) => {
    //Handles the book filtering thru search, works in coordination with onFilterSelected
    setTextFilter(input); //Update the current text filter
    if (input == "") {
      // if textbox is empty, reset books and return an empty list
      setSearchList(books);
      setSearchList([]);
      return;
    }
    let searchData = books.filter((book) => {
      //Filter books from the books array
      return book.name.toLowerCase().includes(input.toLowerCase());
    });
    //console.log(bookMode);
    setSearchList(searchData);
  };
  //useEffect==============================================================>
  useEffect(() => {
    searchBook(textFilter);//search agen when book mode is changed
  }, [bookMode]);
  //useEffect=============================================================/>
  return (
    <View style={styles.mainContainer}>
      {/*render the book list, call bookSelected when a book is pressed*/}

      <View style={styles.headerContainer}>
        <BibleHeader text={"Select a book"} disableBackButton />

        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => onFilterSelected(1)}
            style={bookMode == 1 ? styles.pressedOld : styles.buttonOldBooks}
          >
            <Text style={{ fontSize: 24, color: "#fff", top: 3 }}>Old Testament</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onFilterSelected(2)}
            style={
              bookMode == 2
                ? styles.pressedNew /*lagay dito yung button selected na style*/
                : styles.buttonNewBooks
            }
          >
            <Text style={{ fontSize: 24, color: "#fff", top: 3  }}>New Testament</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iconAndSearch}>
        <Icon
          name="search"
          size={30}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.inputText}
          placeholder={"Search"}
          placeholderTextColor={"#a5a2a6"}
          onChangeText={(input) => {
            searchBook(input);
          }}
        />
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchList.length == 0 && textFilter == "" ? books : searchList} //Display search results if textbox isnt empty
          keyExtractor={({ id }) => id}
          renderItem={renderBooks}
          ListEmptyComponent={
            <Text
              style={{
                fontFamily: "sans-serif-condensed",
                color: "#fff",
                fontSize: 25,
                textAlign: "center",
              }}
            >
              No books found.
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default BibleHome;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#e6e8e8",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 5,
    backgroundColor: "#fff",
  },
  icon: {
    right: 80,
    color: "#000000",
  },
  btnContainer: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
  },

  buttonNewBooks: {
   
    width: "47%",
    borderRadius: 10,
    backgroundColor: "#000000",
    height: 40,
    alignItems: "center",
    marginLeft: 10,
   
  },
  buttonOldBooks: {
   
    width: "47%",
    borderRadius: 10,
    backgroundColor: "#000000",
    height: 40,
    alignItems: "center",
    marginRight: 10,
    
  },
  pressedOld: {

    width: "47%",
    borderRadius: 10,
    backgroundColor: "#6B4198",
    height: 40,
    alignItems: "center",
    marginRight: 10,
    
  },
  pressedNew: {
  
    width: "47%",
    borderRadius: 10,
    backgroundColor: "#6B4198",
    height: 40,
    alignItems: "center",
    marginLeft: 10,
  
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bookChapterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconAndSearch: {
    flexDirection: "row",
    marginRight: 30,
    alignItems: 'center'
  },

  inputText: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 14,
    color: "#000000",
    borderColor: "#a5a2a6",
    borderRadius: 18,
    width: "100%",
    paddingHorizontal: 50,
    backgroundColor: '#fff',
    
  },
  searchIcon:{
    color: "#a5a2a6",
     left: 20,
      bottom: 18,
      position: "absolute",
      zIndex: 1
  },

 
  flatListContainer: {
    flex: 1,
    
  },
});
