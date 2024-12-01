import React, { Children, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { Appbar } from 'react-native-paper'

const AppbarProvider = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => console.log("menu pressed")} />
                <Appbar.Content title={"Classify"} />
                <Appbar.Action icon="cog" onPress={() => console.log("cog pressed")} />
            </Appbar.Header>
            {children}
        </>
    )
}

export default AppbarProvider