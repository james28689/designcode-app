import React from "react";
import {
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import CoursesScreen from "./CoursesScreen";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
    }
  }
`;

const CoursesQuery = gql`
  {
    coursesCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        author
        avatar {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        caption
      }
    }
  }
`;

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };

  componentDidUpdate() {
    this.toggleMenu();
  }

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1,
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}
        >
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome back, </Title>
                <Name>James</Name>
                <NotificationIcon
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
              </TitleBar>

              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo image={logo.image} text={logo.text} key={index} />
                ))}
              </ScrollView>

              <Subtitle>Continue Learning</Subtitle>

              <Query query={CardsQuery}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Message>Loading...</Message>;
                  }

                  if (error) {
                    return <Message>{("Error...", error)}</Message>;
                  }

                  return (
                    <ScrollView
                      horizontal={true}
                      style={{
                        paddingBottom: 30,
                        paddingLeft: 20,
                      }}
                      showsHorizontalScrollIndicator={false}
                    >
                      {data.cardsCollection.items.map((card, index) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={1}
                          onPress={() => {
                            this.props.navigation.push("Section", {
                              section: card,
                            });
                          }}
                        >
                          <Card
                            image={card.image}
                            title={card.title}
                            logo={card.logo}
                            caption={card.caption}
                            subtitle={card.subtitle}
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  );
                }}
              </Query>

              <Subtitle>Popular Courses</Subtitle>
              <Query query={CoursesQuery}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Message>Loading...</Message>;
                  }

                  if (error) {
                    return <Message>{("Error...", error)}</Message>;
                  }

                  return (
                    <ScrollView
                      horizontal={true}
                      style={{
                        paddingBottom: 30,
                        paddingLeft: 20,
                      }}
                      showsHorizontalScrollIndicator={false}
                    >
                      {data.coursesCollection.items.map((course, index) => (
                        <Course
                          key={index}
                          image={course.image}
                          title={course.title}
                          subtitle={course.subtitle}
                          logo={course.logo}
                          author={course.author}
                          avatar={course.avatar}
                          caption={course.caption}
                        />
                      ))}
                    </ScrollView>
                  );
                }}
              </Query>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Framer X",
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma",
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio",
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React",
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift",
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch",
  },
];
