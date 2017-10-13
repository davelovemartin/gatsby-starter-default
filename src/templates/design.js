import React from 'react'
import styled from 'styled-components'
import Backbar from '../components/backbar'
import Footer from '../components/footer'
import Quote from '../components/quote'
import Copyright from '../components/copyright'
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Select,
  Small,
  Subhead,
  TabItem,
  Tabs,
  Text
} from 'rebass'
import Link from 'gatsby-link'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import {
  faCircle,
  faHeart,
  faLink
} from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(brands, faCircle, faHeart, faLink)
const _ = require(`lodash`)

const CustomButton = styled(Button)`
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.25),
              0 2px 10px 0 rgba(0,0,0,0.1);
  line-height: 24px;
`
const FavoriteButton = styled(Button)`
  background-color: white;
  border-radius: 50%;
  margin: 5px;
  width: 48px;
  &:hover {
    cursor:pointer;
  }
`
const CustomLinkButton = styled(Button)`
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.25),
              0 2px 10px 0 rgba(0,0,0,0.1);
  border-radius: 50%;
  margin: 5px;
  width: 48px;
`

class GenderButton extends React.Component {
  handleClick = () => this.props.onClick(this.props.index, this.props.gender)
  render () {
    return <Button
      w={'50%'}
      mr={1}
      bg={this.props.active ? 'blue5' : 'grey5'}
      children={this.props.gender}
      onClick={this.handleClick}
    />
  }
}

const CustomTabs = styled(Tabs)`
  width: fit-content
`
const CustomImage = styled(Image)`
  border-radius: 50%;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.25),
              inset 0 2px 10px rgba(0,0,0,0.1);
  margin: 1rem auto;
`
const CustomText = styled(Text)`
  white-space: pre-wrap;
  letter-spacing: 1px;
  text-align: center;
`

class DesignPage extends React.Component {
  constructor (props) {
    super(props)
    // TODO: change to multiple styles eg. N45 rather than gender
    let products = _.groupBy(this.props.data.stripeProduct.skus.data, data => data.attributes.gender)
    let image = this.props.data.stripeProduct.images[0].toString()

    this.state = {
      favorited: false,
      favColor: 'black',
      isSelected: false,
      activeIndex: null,
      activeSkuId: null,
      activeGenders: Object.keys(products),
      activeImage: image,
      activeSizes: [
        {
          id: null,
          price: '2999',
          attributes: {
            size: 'Choose a size',
          }
        }
      ]
    }
    this.favorite = this.favorite.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  favorite (e) {
    //colours favourite heart
    // TODO: save favourites to user data
    this.state.favorited ? this.setState({favColor: 'black', favorited: false}) : this.setState({favColor: 'base', favorited: true})
  }

  handleClick (index, gender) {
    //sets index to make button selected (blue)
    //sets state to a filtered array by selected product (currently Gender)
    // TODO: change from gender to product
    this.setState({ activeIndex: index})
    let filteredProduct = this.props.data.stripeProduct.skus.data.filter((product) => product.attributes.gender.includes(gender))
    let image = _.groupBy(filteredProduct, data => data.image)
    return this.setState({
      activeSizes: filteredProduct,
      activeImage: Object.keys(image)[0]
    })
  }

  handleChange (e) {
    //sets state based on size and sku selected
    // TODO: handle no gender/style chosen
    let filteredProduct = this.props.data.stripeProduct.skus.data.filter(product => product.attributes.size.includes(e.target.value))
    this.setState({ activeSkuId: filteredProduct[0].id})
  }

  render () {
    return (
      <div>
        <Backbar />
        <Container
          maxWidth={'90%'}
        >
          <Flex>
            <Box
              mt={5}
              w={[1, 1 / 2, 2 / 3]}
            >
              <Image
                src={this.state.activeImage}
                mx={'auto'}
              />
            </Box>
            <Box
              mt={5}
              w={[1, 1 / 2, 1 / 3]}
            >
              <Subhead
                mb={3}
                is={'h1'}
                fontSize={3}
                name={this.props.data.stripeProduct.name}
              />
              <Text
                mb={4}
                children={this.props.data.stripeProduct.description}
              />
              <Text
                mb={4}
              >
                Show it some love:&nbsp;
                <FavoriteButton
                  color={this.state.favColor}
                  onClick={this.favorite}
                >
                  <FontAwesomeIcon
                    size={'2x'}
                    iconDefinition={faHeart}
                    transform='shrink-2 left-5'
                  />
                </FavoriteButton>
              </Text>
              <Flex
                mt={4}
                mb={1}
              >
                {this.state.activeGenders.map((activeGender, index) => (
                  <GenderButton
                    gender={activeGender}
                    key={index}
                    index={index}
                    onClick={this.handleClick}
                    active={this.state.activeIndex === index}
                  />
                ))}
              </Flex>
              <Select
                mt={3}
                value={this.state.value}
                onChange={this.handleChange}
              >
              {this.state.activeSizes.map((activeSize) => (
                <option
                  key={activeSize.id}
                  children={activeSize.attributes.size}
                />
              ))}
              </Select>
              <Small
                ml={1}
                color={'blue'}
              >
                <Link
                  to='#size-guide'
                  children='Size Guide'
                />
              </Small>
              <Flex
                mb={4}
                mt={3}
              >
                <Box width={1 / 2}>
                  <CustomButton
                    mr={1}
                    bg={'base'}
                    px={4}
                    py={1}
                    w={'100%'}
                    children='BUY NOW'
                  />
                </Box>
                <Box width={1 / 2}>
                  <Small
                    ml={3}
                    fontSize={3}
                    children='£29.99'
                  />
                </Box>
              </Flex>
              <Text
                mb={1}
                children='Free delivery &amp; returns on all UK orders'
              />
              <Text
                my={4}
              >
                Share:&nbsp;
                <CustomLinkButton>
                  <FontAwesomeIcon
                    size={'2x'}
                    pack='fab'
                    name='twitter'
                    transform='shrink-1 left-4'
                  />
                </CustomLinkButton>
                <CustomLinkButton>
                  <FontAwesomeIcon
                    size={'2x'}
                    pack='fab'
                    name='facebook-f'
                    transform='shrink-1 left-1'
                  />
                </CustomLinkButton>
                <CustomLinkButton>
                  <FontAwesomeIcon
                    size={'2x'}
                    iconDefinition={faLink}
                    transform='shrink-3 left-4'
                  />
                </CustomLinkButton>
              </Text>
            </Box>
          </Flex>
        </Container>
        <Quote
          children="Every shirt sold contributes to our mission of empowering artists to help people affected by unfair fashion in a way that doesn't cost the Earth"
        />
        <Container>
          <CustomTabs
            m={'auto'}
          >
            <TabItem active>
              The Mission
            </TabItem>
            <TabItem>
              The Artist
            </TabItem>
            <TabItem>
              The T-Shirt
            </TabItem>
            <TabItem>
              Size Guide
            </TabItem>
            <TabItem>
              Shipping and Returns
            </TabItem>
          </CustomTabs>
        </Container>
        <Container
          maxWidth={540}
          my={5}
        >
          <CustomImage
            src='https://www.callofthebrave.org/images/mission640.jpg'
          />
          <CustomText>
            10% of the price of each t-shirt sold goes to projects supporting survivors of the Rana Plaza Building Disaster. Look out for news on the projects we support by subscribing to our newsletter and YouTube channel.
          </CustomText>
        </Container>
        <Footer />
        <Copyright />
      </div>
    )
  }
}

export default DesignPage

export const query = graphql`
  query DesignQuery($slug: String!) {
    stripeProduct(slug: { eq: $slug } ) {
      id
      name
      url
      caption
      description
      slug
      images
      skus {
        data {
          id
          price
          image
          attributes {
            size
            artist
            age
            brand
            style
            colour
            gender
            material
          }
        }
      }
    }
  }
`
