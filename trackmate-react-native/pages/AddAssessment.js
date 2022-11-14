import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

const AddAssessment = () => {
    const assessments = useSelector(store => store.student.currentStudent?.assessments);
    const currentStudent = useSelector(store => store.student.currentStudent?.assessments)
    const dispatch = useDispatch()

    const navigateBack = () => {
        dispatch(resetCurrentStudent());
        navigation.goBack();
    };

    return (
        <View>
            <Header
                backButton={true}
                onBackButtonPressed={navigateBack}
                title={(currentStudent?.firstName || 'Loading') + ' ' + (currentStudent?.lastName || '') + ' - ' + (currentClass.className || 'Loading')}
            />
            
        </View>
    )
}

export default AddAssessment