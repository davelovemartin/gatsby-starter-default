import React from 'react'
import Link, { navigateTo }  from 'gatsby-link'
import Img from 'gatsby-image'
import StripeCheckout from 'react-stripe-checkout'
import Backbar from '../components/backbar'
import Copyright from '../components/copyright'
import Footer from '../components/footer'
import Quote from '../components/quote'
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

import styled, { css } from 'styled-components'

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
  line-height: 24px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.25),
              0 2px 10px 0 rgba(0,0,0,0.1);
`
const WarningText = styled(Text)`
  background-color: rgba(201, 41, 41, 0.25);
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
const CustomGenderButton = styled(Button)`
  ${props => props.showWarning && css`
    box-shadow: 0 0 0 1px #c92929
  `}
`

class GenderButton extends React.Component {
  handleClick = () => this.props.onClick(this.props.index, this.props.gender)
  render () {
    return <CustomGenderButton
      w={'50%'}
      mr={1}
      showWarning={this.props.showWarning}
      bg={this.props.active ? 'blue5' : 'grey5'}
      children={this.props.gender}
      onClick={this.handleClick}
    />
  }
}

class CustomStripeCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.onToken = this.onToken.bind(this)
    this.state = { orderNo: null}
  }

  async onToken (token, args) {
    const res = await fetch(process.env.STRIPE_CHECKOUT_URL, {
      method: 'POST',
      body: JSON.stringify({
        token,
        order: {
          currency: this.props.currency,
          items: [
            {
              type: 'sku',
              parent: this.props.skuId
            }
          ],
          shipping: {
            name: args.shipping_name,
            address: {
              line1: args.shipping_address_line1,
              city: args.city,
              postal_code: args.shipping_address_zip
            }
          }
        }
      })
    })
    // The await operator is used to wait for a Promise. It can only be used inside an async function.
    const data = await res.json()
    const orderNo = data.order.id
    const slug = this.props.slug
    navigateTo(`/thankyou?order=${orderNo}&slug=${slug}`)
  }
  render () {
    const skuId = this.props.skuId;
    const currency = this.props.currency;
    return <StripeCheckout
      panelLabel={this.props.panelLabel}
      description={this.props.description}
      amount={this.props.amount}
      currency={this.props.currency}
      stripeKey={this.props.stripeKey}
      shippingAddress={this.props.shippingAddress}
      billingAddress={this.props.billingAddress}
      zipCode={this.props.zipCode}
      locale={this.props.locale}
      token={this.onToken}
      reconfigureOnUpdate={this.props.reconfigureOnUpdate}
      triggerEvent={this.props.triggerEvent}
      name={this.props.name}
      skuId={this.props.skuId}
      slug={this.props.slug}
    >
      <CustomButton
        mr={1}
        bg={'base'}
        px={4}
        py={1}
        w={'100%'}
        children={this.props.panelLabel}
      />
    </StripeCheckout>
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
const CustomSelect = styled(Select)`
  ${props => props.showWarning && css`
    > select {
      box-shadow: inset 0 0 0 1px #c92929;
    }
  `}
`

class DesignPage extends React.Component {
  constructor (props) {
    super(props)
    // TODO: change to multiple styles eg. N45 rather than gender
    let products = _.groupBy(this.props.data.stripeProduct.skus.data, data => data.attributes.gender)
    let image = this.props.data.stripeProduct.images[0].toString()
    this.state = {
      activeGenders: Object.keys(products),
      activeImage: image,
      activeIndex: null,
      activeSizes: [
        {
          id: null,
          price: '2999',
          attributes: {
            size: 'Choose a size',
          }
        }
      ],
      activeSkuId: null,
      favColor: 'black',
      isFavorited: false,
      isSelected: false,
      showWarning: false,
      showSizeWarning: false
    }
    this.favorite = this.favorite.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDeactivatedCheckoutClick = this.handleDeactivatedCheckoutClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  favorite (e) {
    //colours favourite heart
    // TODO: save favourites to user data
    this.state.isFavorited ? this.setState({favColor: 'black', isFavorited: false}) : this.setState({favColor: 'base', isFavorited: true})
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
      activeSkuId: filteredProduct[0].id,
      activeImage: Object.keys(image)[0],
      isSelected: true,
      showWarning: false,
      showSizeWarning: false
    })
  }

  handleDeactivatedCheckoutClick () {
    this.setState({showWarning: true})
  }

  handleChange (e) {
    //sets state based on size and sku selected
    let filteredProduct = this.props.data.stripeProduct.skus.data.filter(product => product.attributes.size.includes(e.target.value))
    this.setState({
      activeSkuId: filteredProduct[0].id
    })
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
                    showWarning={this.state.showWarning}
                    gender={activeGender}
                    key={index}
                    index={index}
                    onClick={this.handleClick}
                    active={this.state.activeIndex === index}
                  />
                ))}
              </Flex>
              <CustomSelect
                disabled={!this.state.isSelected}
                showWarning={this.state.showWarning}
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
              </CustomSelect>
              <Text
                fontSize={0}
                pt={2}
                pr={2}
                ml={1}
                color={'blue'}
                right
              >
                <Link
                  to='#size-guide'
                  children='Size Guide'
                />
              </Text>
              { this.state.showSizeWarning &&
                <Flex
                  mb={4}
                  mt={3}
                >
                  <Box width={1}>
                    <WarningText
                      p={2}
                      children={'Please select a style before selecting your size'}
                    />
                  </Box>
                </Flex>
              }
              <Flex
                mb={4}
                mt={3}
              >
                <Box width={1 / 2}>
                  {
                     this.state.isSelected ? (
                      <CustomStripeCheckout
                        panelLabel='BUY NOW'
                        description={this.props.data.stripeProduct.size + ' ' + this.props.data.stripeProduct.gender + ' ' + this.props.data.stripeProduct.name}
                        amount={2999}
                        currency='gbp'
                        stripeKey={process.env.STRIPE_PUBLIC_KEY}
                        shippingAddress
                        billingAddress
                        zipCode
                        locale='en'
                        reconfigureOnUpdate
                        triggerEvent={'onClick'}
                        skuId={this.state.activeSkuId}
                        name='Call of the Brave'
                        slug={this.props.data.stripeProduct.slug}
                      />
                    ) : (
                      <CustomButton
                        mr={1}
                        bg={'base'}
                        px={4}
                        py={1}
                        w={'100%'}
                        children='BUY NOW'
                        onClick={this.handleDeactivatedCheckoutClick}
                      />
                    )
                  }
                </Box>
                <Box width={1 / 2}>
                  <Small
                    ml={3}
                    fontSize={3}
                    children='£29.99'
                  />
                </Box>
              </Flex>
              { this.state.showWarning &&
                <Flex
                  mb={4}
                  mt={3}
                >
                  <Box width={1}>
                    <WarningText
                      p={2}
                      children={'Please select from the available style and size options'}
                    />
                  </Box>
                </Flex>
              }
              <Text
                mb={1}
                children='Free delivery &amp; returns on all UK orders'
              />
              // TODO: add share functionality
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
          // TODO: add tab content and add functionality
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
