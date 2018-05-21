import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class RenderInput extends React.Component {
	render() {
		const { keyboardType, secureTextEntry, placeholder,
		returnKeyLabel, refField, onSubmit, meta: { touched, error }, input: { onChange, ...resInput } } = this.props;
		return (
		<View>
			<Animatable.View
				animation='zoomIn' iterationCount={1}
				style={{ alignItems: 'center', justifyContent: 'center' }}
			>
				<TextInput
					style={styles.input}
					keyboardType={keyboardType}
					secureTextEntry={secureTextEntry}
					returnKeyLabel={returnKeyLabel}
					ref={refField}
					onSubmitEditing={onSubmit}
					onChangeText={onChange} {...resInput}
					placeholder={placeholder}
					placeholderTextColor='black'
				/>
			</Animatable.View>
			{
				touched && (error && 
					<Text style={{ color: 'red', fontSize: 13, textAlignVertical: 'top' }}>
						{error}
					</Text>
				)
			}
		</View>
	);
	}	
}

const styles = StyleSheet.create({
	input: {
		borderColor: 'black',  
		height: 50, 
		width: 300, 
		marginVertical: 10,
		fontWeight: 'bold',
		color: 'black',
		fontSize: 16,
	}
});
