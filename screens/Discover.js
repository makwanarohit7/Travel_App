import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import { Image } from "react-native";
import { TextInput } from "react-native";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { ActivityIndicator } from "react-native";
import { getLongData, getPlaceData } from "../api";
export default function Discover() {
  const navigation = useNavigation();
  const textInputRef = useRef(null);
  const [city, setCity] = useState("");
  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);

  const [leti, setleti] = useState(23.2232877);
  const [long, setlong] = useState(72.6492267);
  //   startups
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    // textInputRef.current.focus();
    getPlaceData(leti, long, type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 4000);
    });
  }, [long, type]);

  // States

  //   Functions
  const handleSearch = async () => {
    getLongData(city).then((data) => {
      setleti(data[0]);
      setlong(data[1]);
      //   console.log(data[0]);
      //   console.log(data[1]);
    });
    // getLongData(city);
    console.log("Button Clicked");
  };

  return (
    <SafeAreaView>
      {/* First Section */}
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
          <Text className="text-[#527283] text-[36px]">the beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      {/* search Section */}

      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
        <TextInput
          ref={textInputRef}
          className="mr-auto pr-auto"
          placeholder="Search"
          onChangeText={(text) => setCity(text)}
          // value={query}
        />
        <TouchableOpacity
          className="bg-[#0B646B] rounded-lg p-2"
          onPress={handleSearch}
        >
          <Text className="text-white">Search</Text>
        </TouchableOpacity>
        {/* <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          onFail={(error) => console.error(error)}
          query={{
            key: "AIzaSyCZte9X_TP2VxGpDVzEaqPzd68oa6WkHoU",
            language: "en",
          }}
        /> */}
      </View>

      {/* Menu Section */}
      {isLoading ? (
        <View className="items-center justify-between mt-32">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          {/* Main Option */}
          <View className=" flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            {/* Top Bar */}
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[28px] font-bold">
                Top Tips
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[20px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#A0C4C7"
                />
              </TouchableOpacity>
            </View>

            {/* Secound API Bar */}
            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCarDontainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.large?.url
                          ? data?.photo?.images?.large?.url
                          : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className=" w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                      Opps...No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
