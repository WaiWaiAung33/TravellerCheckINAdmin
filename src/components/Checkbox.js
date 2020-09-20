import React from 'react';
import { View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';

export default class Checkbox extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            isCheck:this.props.isCheck
        }
    }

    handleCheckClicked(){
        this.setState({
            isCheck:true
        })
        // // Call function type prop with return values.
        if(this.props.onCheck){
            this.props.onCheck(this.state.isCheck);
        }
    }
    render(){
        return(
            <TouchableOpacity 
                onPress={()=>this.handleCheckClicked()}  
            >
                <View style={ styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        <View style={styles.tickBox}>
                            {
                                this.state.isCheck?
                                (
                                    <Image source={require("@images/true.png")} style={styles.tickImg} />
                                ):null
                            }
                        </View>
                    </View>
                    <Text style={styles.showText}>{this.props.langText}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    checkboxContainer:{
        flexDirection:'row'
    },
    checkbox:{
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: '#000',
        marginRight:10,
        marginTop:5
    },
    tickBox:{
        justifyContent:'center',
        alignItems:'center'
    },
    tickImg:{
        height: 15,
        width: 15,
    },
    showText:{
        textAlign:"center"
    }
});
