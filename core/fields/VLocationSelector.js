import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { BASE_URL, API_KEY } from "../../config/consts";
import { SafeAreaView } from "react-native-safe-area-context";
import VDropDownPicker from "./VDropDownPicker";
import Feather from "react-native-vector-icons/Feather";
import { useForm, Controller, ErrorMessage } from "react-hook-form";

export const VLocationSelector = ({
  textInputStyle,
  onChangeValue,
  textColor,
  placeholder,
  style,
  modalStyle,
  errorStyle,
  errors,
  name,
}) => {
  const [data, setData] = useState({
    city: {
      title: "",
      value: 0,
    },
    region: {
      title: "",
      value: 0,
    },
    country: {
      title: "",
      value: 0,
    },
  });

  const [coutriesList, setCountriesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);

  const resetRegionsAndCities = () => {
    setData((prev) => ({
      ...prev,
      region: {
        title: "",
        value: 0,
      },
      city: {
        title: "",
        value: 0,
      },
    }));
  };

  const resetCities = () => {
    setData((prev) => ({
      ...prev,

      city: {
        title: "",
        value: 0,
      },
    }));
  };

  const get_countrys = async () => {
    setLoading(true);
    console.log(loading);
    try {
      const response = await fetch(
        BASE_URL + "/api/method/geo.get?api_key=" + API_KEY + "&type=countries",
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const response_data = await response.json();
      const countries = [];

      if (response_data.response) {
        Object.keys(response_data.response.items).map(function (key) {
          if (key !== "0") {
            countries.push({
              label: response_data.response.items[key],
              value: key,
            });
          }
        });
        setCountriesList(countries);
      }
    } catch (e) {}
  };
  const get_regions = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        BASE_URL +
          "/api/method/geo.get?api_key=" +
          API_KEY +
          "&type=regions&parent_id=" +
          data.country.value,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const response_data = await response.json();
      const regions = [];

      if (response_data.response) {
        Object.keys(response_data.response.items).map(function (key) {
          if (key !== "0") {
            regions.push({
              label: response_data.response.items[key],
              value: key,
            });
          }
        });

        setRegionsList(regions);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const get_cities = async () => {
    setLoading(true);
    console.log(loading);
    try {
      const response = await fetch(
        BASE_URL +
          "/api/method/geo.get?api_key=" +
          API_KEY +
          "&type=cities&parent_id=" +
          data.region.value,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const response_data = await response.json();
      const cities = [];

      if (response_data.response) {
        Object.keys(response_data.response.items).map(function (key) {
          if (key !== "0") {
            cities.push({
              label: response_data.response.items[key],
              value: key,
            });
          }
        });
        setCitiesList(cities);
        console.log(cities);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (!data.country.value) {
      get_countrys().then(() => {
        console.log("Грузим страны");
        setLoading(false);
      });
    } else if (data.country.value && !data.region.value) {
      get_regions().then(() => {
        console.log("Грузим регионы");
        setLoading(false);
      });
    } else if (data.country.value && data.region.value && !data.city.value) {
      get_cities().then(() => {
        console.log("Грузим города");
        setLoading(false);
      });
    }
  }, [data]);

  return (
    <View
      style={[
        textInputStyle,
        ,
        errors[name] && {
          borderColor: "red",
          borderLeftWidth: 5,
        },
      ]}
    >
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Text style={{ color: textColor }}>
          {!data.city.value ? placeholder : data.city.title}
        </Text>
      </TouchableOpacity>
      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <Text style={errorStyle}>{message}</Text>}
      </ErrorMessage>

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={[modalStyle, { flex: 1, alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 20,
                paddingHorizontal: 100,
                opacity: 0.5,
              }}
            >
              <Text style={{ fontSize: 20 }}>Закрыть</Text>
              <Feather name="chevron-down" size={24} />
            </View>
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              width: "80%",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <VDropDownPicker
              items={coutriesList}
              style={style}
              name={name}
              errors={{}}
              labelStyle={{ color: "#003f5c" }}
              placeholder="Выбор страны"
              value={data.country.title}
              dropDownLabelStyle={{ fontSize: 16 }}
              defaultNull
              dropDownMaxHeight={250}
              disabled={coutriesList.length <= 0}
              animation="fade"
              onChangeItem={(item) => {
                resetRegionsAndCities();
                setData((prev) => ({
                  ...prev,
                  country: {
                    title: item.label,
                    value: item.value,
                  },
                }));
              }}
            />

            <VDropDownPicker
              items={regionsList}
              style={style}
              name={name}
              errors={{}}
              labelStyle={{ color: "#003f5c" }}
              placeholder="Выбор региона"
              value={data.region.title}
              dropDownLabelStyle={{ fontSize: 16 }}
              defaultNull
              dropDownMaxHeight={250}
              disabled={!data.country.value}
              animation="fade"
              onChangeItem={(item) => {
                resetCities();
                setData((prev) => ({
                  ...prev,
                  region: {
                    title: item.label,
                    value: item.value,
                  },
                }));
              }}
            />

            <VDropDownPicker
              items={citiesList}
              style={style}
              name={name}
              errors={{}}
              labelStyle={{ color: "#003f5c" }}
              placeholder="Выбор города"
              value={data.city.title}
              dropDownLabelStyle={{ fontSize: 16 }}
              defaultNull
              dropDownMaxHeight={250}
              disabled={!data.region.value}
              animation="fade"
              onChangeItem={(item) => {
                setData((prev) => ({
                  ...prev,
                  city: {
                    title: item.label,
                    value: item.value,
                  },
                }));
                onChangeValue(item.value);
                setModalVisible(false);
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};
