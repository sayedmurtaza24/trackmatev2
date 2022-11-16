import React from 'react';
import { View, StyleSheet, Text } from "react-native";

const DateTile = ({ date }) => {
    const convertDate = (date) => {
        const dateObj = date?.split("T")[0].split("-");
        const day = dateObj?.[2];
        const month = dateObj?.[1];
        const year = dateObj?.[0];
        let monthName = "";
        switch (Number.parseInt(month)) {
            case 1:
                monthName = "JAN";
                break;
            case 2:
                monthName = "FEB";
                break;
            case 3:
                monthName = "MAR";
                break;
            case 4:
                monthName = "APR";
                break;
            case 5:
                monthName = "MAY";
                break;
            case 6:
                monthName = "JUNE";
                break;
            case 7:
                monthName = "JULY";
                break;
            case 8:
                monthName = "AUG";
                break;
            case 9:
                monthName = "SEPT";
                break;
            case 10:
                monthName = "OCT";
                break;
            case 11:
                monthName = "NOV";
                break;
            case 12:
                monthName = "DEC";
                break;
            default:
                break;
        }
        return { day, year, monthName };
    };

    const { day, year, monthName } = convertDate(date);

    return (
        <View style={styles.dateTile}>
            <Text style={styles.month}>{monthName}</Text>
            <Text style={styles.day}>{day}</Text>
            <Text style={styles.year}>{year}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dateTile: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: 60
    },
    day: {
        fontSize: 22
    },
    month: {
        fontSize: 9
    },
    year: {
        fontSize: 10
    },
});

export default DateTile