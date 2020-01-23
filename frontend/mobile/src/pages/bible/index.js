import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';  // https://www.npmjs.com/package/react-native-material-dropdown

function Bible(){
    let data = [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      },{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      },{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      },{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      },{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }];

    const data2 = [ 1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
                    'ihdasoihdoahdoasiohdoiosnopiecne iojdoi pofjneoif fn pojfwmfd pof enfpeofjpewojf poif fokj0ewpoj fepoewjf pewjf pofj epof epofj epwokv e-woj ewpfoiew fmpeojf epof epwofuj epofuie p9ofj epfoke ik0epw9oijf e peojfekjwefpoejf w',
                    22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40 ].map( item => {
      return{
        id: `${item}`,
        title:item,
        value: item
      }
    } )

    function Item({ title }) {
      return (
        <View style={{ paddingHorizontal: 8, paddingVertical: 4, justifyContent: 'center', backgroundColor: '#FAFAFA', borderBottomColor: '#CCC', borderBottomWidth: 1 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    }

    return( 
    <>
        <View style={ styles.searchBible } >
            <Dropdown
                itemCount = { 8 }
                dropdownPosition={ 0 }
                dropdownOffset={ { top: 18, left: 0 } }
                containerStyle={ { width: 120, justifyContent: 'center', marginHorizontal: 16} }
                data={data}
            />
            <Dropdown
                itemCount = { 8 }
                dropdownPosition={ 0 }
                dropdownOffset={ { top: 18, left: 0 } }
                containerStyle={ { width: 70, justifyContent: 'center', marginHorizontal: 16} }
                data={data2}
            />
        </View>
        <FlatList
          data={data2}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
        <View style={ { height: 50, elevation: 3, backgroundColor: '#FFF' } } ></View>
    </>
    )
}

function optionsBook(){
    return [ 'Genesis', 'Exodos','Genesis', 'Exodos','Genesis', 'Exodos','Genesis', 'Exodos' ]
}


const styles = StyleSheet.create({
    searchBible: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#FFF',
        elevation: 2,
        justifyContent: 'center',
    },
    dropdownButton: {
        flex: 1,
        width: 150,
        height: 56,
        backgroundColor: '#888888',
        elevation: 5,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    dropdownButton: {
        width: 180,
        backgroundColor: '#FFF',
    },
    dropdownButton2: {
        width: 74,
        backgroundColor: '#0f5'
    },
    dropdownTextStyle: {
        fontSize: 24,
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    dropdownDropbox: {
        width: 150,
        height:100
    },
    dropdownDropboxTextStyle: {
        height: 48,
    }
})

export default Bible