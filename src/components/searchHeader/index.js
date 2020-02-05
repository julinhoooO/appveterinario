import React, {useState} from 'react';
import { Header, Content, SearchbarHeader } from './styles';

export default function SearchHeader({onChangeText}) {
    const [searcQuery, setSearchQuery] = useState("");
    function changeText(text){
      setSearchQuery(text);
      onChangeText(text);
    }
    return (
      <Header>
        <Content>
            <SearchbarHeader
                placeholder="Pesquisar"
                onChangeText={changeText}
                value={searcQuery}
                icon="magnify"
                onIconPress={() => {}}
            />
        </Content>
      </Header>
    );
}