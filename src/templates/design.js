import React from 'react'
import Link, { navigateTo }  from 'gatsby-link'
import createHistory from 'history/createBrowserHistory'
import Img from 'gatsby-image'
import StripeCheckout from 'react-stripe-checkout'
import Helmet from 'react-helmet'
import Backbar from '../components/backbar'
import Quote from '../components/quote'
import Copyright from '../components/copyright'
import Footer from '../components/footer'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
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

const CustomTable = styled.table`
  tr > td {
    width: 15%;
  }
`
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
  outline: none;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:active {
    background-color: white;
  }
`
const CustomLinkButton = styled(Button)`
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.25),
              0 2px 10px 0 rgba(0,0,0,0.1);
  border-radius: 50%;
  margin: 5px;
  width: 48px;
`
const CustomStyleButton = styled(Button)`
  ${props => props.showWarning && css` box-shadow: 0 0 0 1px #c92929`}
`

class StyleButton extends React.Component {
  handleClick = () => this.props.onClick(this.props.index, this.props.style)
  render () {
    return <CustomStyleButton
      mr={1}
      showWarning={this.props.showWarning}
      bg={this.props.active ? 'blue' : 'grey'}
      children={this.props.style}
      onClick={this.handleClick}
    />
  }
}

const ChromeTabItem = styled(TabItem)`
  outline: none;
  cursor: pointer;
`

class CustomTabItem extends React.Component {
  handleTabClick = () => this.props.onClick(this.props.tabIndex)
  render () {
    return <ChromeTabItem
      tabIndex={this.props.tabIndex}
      active={this.props.active}
      children={this.props.children}
      onClick={this.handleTabClick}
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
    const history = createHistory()
    history.push({
      pathname: '/thankyou/',
      state: { order: data.order.id }
    })
    history.go()
  }
  render () {
    const skuId = this.props.skuId;
    const currency = this.props.currency;
    return <StripeCheckout
      amount={Number(this.props.amount)}
      billingAddress={this.props.billingAddress}
      currency={this.props.currency}
      description={this.props.description}
      locale={this.props.locale}
      name={this.props.name}
      panelLabel={this.props.panelLabel}
      reconfigureOnUpdate={this.props.reconfigureOnUpdate}
      shippingAddress={this.props.shippingAddress}
      skuId={this.props.skuId}
      slug={this.props.slug}
      stripeKey={this.props.stripeKey}
      token={this.onToken}
      triggerEvent={this.props.triggerEvent}
      zipCode={this.props.zipCode}
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

    let products = _.groupBy(this.props.data.stripeProduct.skus.data, data => data.attributes.style)
    let image = this.props.data.stripeProduct.images[0].toString()
    this.state = {
      activeStyles: Object.keys(products),
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
      activeTabIndex: 0,
      favColor: 'black',
      isFavorited: false,
      isSelected: false,
      showWarning: false,
      showSizeWarning: false
    }
    this.favorite = this.favorite.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
    this.handleLinkClick = this.handleLinkClick.bind(this)
    this.handleDeactivatedCheckoutClick = this.handleDeactivatedCheckoutClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  favorite (e) {
    //colours favourite heart
    // TODO: save favourites to user data
    this.state.isFavorited ? this.setState({favColor: 'black', isFavorited: false}) : this.setState({favColor: 'base', isFavorited: true})
  }

  handleTabClick (index) {
    this.setState({ activeTabIndex: index})
  }

  handleClick (index, style) {
    //sets index to make button selected (blue)
    //sets state to a filtered array by selected product
    this.setState({ activeIndex: index})
    let filteredProduct = this.props.data.stripeProduct.skus.data.filter(product => product.attributes.style.includes(style))
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

  handleLinkClick () {
    this.setState({ activeTabIndex: 3})
  }

  render () {
    const product = this.props.data.stripeProduct
    return (
      <div>
        <Helmet
          title={this.props.data.site.siteMetadata.name}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        />
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
                children={product.name}
              />
              <Text
                mb={4}
                children={product.description}
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
                {this.state.activeStyles.map((activeStyle, index) => (
                  <StyleButton
                    showWarning={this.state.showWarning}
                    style={activeStyle}
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
              <Link
                color={'blue'}
                to={'/designs/' + product.slug + '#size-guide'}
                onClick={this.handleLinkClick}
              >
                <Text
                  children='Size Guide'
                  right
                  fontSize={0}
                  pt={2}
                  pr={2}
                  ml={1}
                />
              </Link>
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
                        amount={this.state.activeSizes[0].price}
                        billingAddress
                        currency='gbp'
                        description={product.name}
                        locale='en'
                        name={this.props.data.site.siteMetadata.name}
                        panelLabel='BUY NOW'
                        reconfigureOnUpdate
                        shippingAddress
                        skuId={this.state.activeSkuId}
                        slug={product.slug}
                        stripeKey={process.env.STRIPE_PUBLIC_KEY}
                        triggerEvent={'onClick'}
                        zipCode
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
                    children={'£' + Number(this.state.activeSizes[0].price)/100}
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
            </Box>
          </Flex>
        </Container>
        <Quote
          children="Every shirt sold contributes to our mission of empowering artists to help people affected by unfair fashion in a way that doesn't cost the Earth"
        />
        <Container>
          <CustomTabs
            id='size-guide'
            m={'auto'}
          >
            <CustomTabItem
              active={this.state.activeTabIndex === 0}
              tabIndex={0}
              onClick={this.handleTabClick}
              children={'The Mission'}
            />
            <CustomTabItem
              active={this.state.activeTabIndex === 2}
              tabIndex={2}
              onClick={this.handleTabClick}
              children={'The T-Shirt'}
            />
            <CustomTabItem
              active={this.state.activeTabIndex === 3}
              tabIndex={3}
              onClick={this.handleTabClick}
              children={'Size Guide'}
            />
            <CustomTabItem
              active={this.state.activeTabIndex === 4}
              tabIndex={4}
              onClick={this.handleTabClick}
              children={'Shipping and Returns'}
            />
          </CustomTabs>
        </Container>
        {this.state.activeTabIndex === 0 ?
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
        : null }
        {this.state.activeTabIndex === 2 ?
          <Container
            maxWidth={540}
            my={5}
          >
            <Flex
              justify={'space-around'}
            >
              <Image
                src='https://www.callofthebrave.org/images/fwflogo_webrgb_large.png'
              />
              <Image
                src='https://www.callofthebrave.org/images/GOTS.png'
              />
              <Image
                src='https://www.callofthebrave.org/images/oeko-tex.png'
              />
            </Flex>
            <Text>
              <ul>
                <li>70% Bamboo 30% Organic Cotton</li>
                <li>Jersey 4oz / 150g</li>
                <li>Made by people paid a living wage and in decent conditions</li>
              </ul>
              <p>Printed on demand using:</p>
              <ul>
                <li>the latest direct-to-garment printing technology</li>
                <li>water-based inkjet textile inks</li>
                <li>50% less ink than traditional printing techniques</li>
              </ul>
            </Text>
          </Container>
        : null }
        {this.state.activeTabIndex === 3 ?
          <Container
            maxWidth={540}
            my={5}
          >
            <CustomImage
              src='https://www.callofthebrave.org/images/sizes.jpg'
            />
            <CustomText>
              <CustomTable>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Small</th>
                    <th>Medium</th>
                    <th>Large</th>
                    <th>XL</th>
                    <th>2XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Mens</strong></td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Chest</td>
                    <td>97</td>
                    <td>102</td>
                    <td>108</td>
                    <td>114</td>
                    <td>120</td>
                  </tr>
                  <tr>
                    <td>Length</td>
                    <td>68</td>
                    <td>70</td>
                    <td>72</td>
                    <td>74</td>
                    <td>74</td>
                  </tr>
                  <tr>
                    <td><strong>Womens</strong></td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Bust</td>
                    <td>82</td>
                    <td>88</td>
                    <td>94</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Length</td>
                    <td>60</td>
                    <td>62</td>
                    <td>64</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </CustomTable>
              <p
                right
              >all measurements in cm
              </p>
            </CustomText>
          </Container>
        : null }
        {this.state.activeTabIndex === 4 ?
          <Container
            maxWidth={540}
            my={5}
          >
            <Heading
              fontSize={1}
              center
              children={'Shipping'}
              mb={3}
            />
            <CustomText
              mb={2}
            >We send the t-shirt out so that it will fit through a standard letterbox.</CustomText>
            <CustomText
              mb={2}
            >The free postage offer is for addresses on the UK mainland. We'll either be using local pedal powered couriers or the good old Royal Mail. International Shipping is £5 per t-shirt.</CustomText>
            <CustomText
              mb={2}
            >We normally print and ship within 3 - 5 working days. However, during times of high volume there may be delays.</CustomText>
            <CustomText
              mb={2}
            >For crowdfunded t-shirts, your card will be charged if the design has reached the minimum number on the campaign end date. Please ensure that you have cleared funds available at the time. We will send out your t-shirt when we have received cleared funds, so your t-shirt may take up to 10 working days to be delivered from the campaign end date.</CustomText>
            <Heading
              fontSize={1}
              center
              children={'Returns'}
              mt={3}
              mb={3}
            />
            <CustomText
              mb={2}
            >Not completely satisfied with the t-shirt? We want you to be 'head over heels' happy, and you are within your rights as a consumer to return it within 14 days of receiving it.</CustomText>
            <CustomText
              mb={2}
            >We'll provide a freepost address and, as long as you return it in a saleable condition, we will take it back and refund your money.</CustomText>
            <CustomText
              mb={2}
            >However, if you have damaged the tee shirt - no dice. Sorry, thems the rules.</CustomText>
          </Container>
        : null }
      </div>
    )
  }
}

export default DesignPage

export const query = graphql`
  query DesignQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulNavigation {
      edges {
        node {
          order
          href
          position
          text
        }
      }
    }
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
            artist
            colour
            size
            style
          }
        }
      }
    }
  }
`
