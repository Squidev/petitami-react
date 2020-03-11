import React, {Component} from 'react';

class DogInfo extends Component {
    state = {
        dogName: "",
        ownerName: "",
        contactMediums: [],

    };

    componentDidMount() {
        this.setState(
            {
                    dogName: "Chocoperro",
                    ownerName: "Chocoperro Owner",
                    contactMediums: [   {contactMediumName: "Facebook", value: "www.facebook.com/ChocoperroOwner"},
                                        {contactMediumName: "Instagram", value: "www.instagram.com/ChocoperroOwner"},
                                        {contactMediumName: "Tel", value: "2614785498"}
                    ]
            }
            );

    }

    render() {
        return (
            <div>
                <img src={""} alt={"Perro image"}/><br/>
                <label>Nombre: {this.state.dogName}</label><br />
                <label>Dueño: {this.state.ownerName}</label>
                <ul>
                {this.state.contactMediums.map((contactMedium) => <li>{contactMedium.contactMediumName} : {contactMedium.value}</li>)}
                </ul>
            </div>
        );
    }
}

export default DogInfo;

