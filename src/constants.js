//Copyright 2020, Provecho, All rights reserved.

import { StyleSheet, Dimensions, PixelRatio} from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
//pixel will always be 1 pixel on any screen. used for thin borders
export const pixel = 1/PixelRatio.get();

//unit i use for anything thats not % so that things grow with the width of the screen 
export const u = (200 + width)/1000


export const icon_stroke_thickness = 5

//how far from the bottom of the defualt linehight the actual bottm of gjpq etc are
export const text_bottom = 0.1

//how far from the top of the defualt linehight the actual top of ASDF1233 etc are
export const text_top = 0.2

//how far from the top of the defualt linehight the center of text is
export const text_center = 0.6

//defualt lineheight/fontsize
export const line_height_coeff = 1.2

//distance form top of scren too top of modal in %
export const high_modal_top = '20%'
export const low_modal_top = '45%'

//preset colors
export const black = '#111'
export const black_2 = '#222'
export const white = '#f3f3f3'
export const grey = '#999'
export const grey_2 = '#bbb'
export const dark_grey = '#2d2d2d'
export const light_grey = '#e5e5e5'
export const yellow = '#fb4'
export const pink = '#ff1177'
export const grey_out = '#0008'
//transparet
export const t = '#0000'

//preset heights rounded to nearest pixel
const height_1 = PixelRatio.roundToNearestPixel(4*u)
const height_2 = PixelRatio.roundToNearestPixel(6*u)
const height_3 = PixelRatio.roundToNearestPixel(8*u)
const height_4 = PixelRatio.roundToNearestPixel(10*u)
const height_5 = PixelRatio.roundToNearestPixel(12*u)
const height_6 = PixelRatio.roundToNearestPixel(14*u)
const height_7 = PixelRatio.roundToNearestPixel(16*u)
const height_8 = PixelRatio.roundToNearestPixel(18*u)
const height_9 = PixelRatio.roundToNearestPixel(20*u)
const height_10 = PixelRatio.roundToNearestPixel(22*u)
const height_11 = PixelRatio.roundToNearestPixel(24*u)
const height_12 = PixelRatio.roundToNearestPixel(26*u)
const height_13 = PixelRatio.roundToNearestPixel(28*u)
const height_14 = PixelRatio.roundToNearestPixel(30*u)
const height_15 = PixelRatio.roundToNearestPixel(32*u)
const height_16 = PixelRatio.roundToNearestPixel(35*u)
const height_17 = PixelRatio.roundToNearestPixel(40*u)
const height_18 = PixelRatio.roundToNearestPixel(45*u)
const height_19 = PixelRatio.roundToNearestPixel(50*u)
const height_20 = PixelRatio.roundToNearestPixel(55*u)
const height_21 = PixelRatio.roundToNearestPixel(60*u)
const height_22 = PixelRatio.roundToNearestPixel(80*u)
const height_23 = PixelRatio.roundToNearestPixel(100*u)
const height_24 = PixelRatio.roundToNearestPixel(140*u)
const height_25 = PixelRatio.roundToNearestPixel(235*u)
const height_26 = PixelRatio.roundToNearestPixel(300*u)
const height_27 = PixelRatio.roundToNearestPixel(400*u)

//preset widths rounded to nearest pixel
const width_1 = PixelRatio.roundToNearestPixel(4*u)
const width_2 = PixelRatio.roundToNearestPixel(6*u)
const width_3 = PixelRatio.roundToNearestPixel(8*u)
const width_4 = PixelRatio.roundToNearestPixel(10*u)
const width_5 = PixelRatio.roundToNearestPixel(12*u)
const width_6 = PixelRatio.roundToNearestPixel(14*u)
const width_7 = PixelRatio.roundToNearestPixel(16*u)
const width_8 = PixelRatio.roundToNearestPixel(18*u)
const width_9 = PixelRatio.roundToNearestPixel(20*u)
const width_10 = PixelRatio.roundToNearestPixel(22*u)
const width_11 = PixelRatio.roundToNearestPixel(24*u)
const width_12 = PixelRatio.roundToNearestPixel(26*u)
const width_13 = PixelRatio.roundToNearestPixel(28*u)
const width_14 = PixelRatio.roundToNearestPixel(30*u)
const width_15 = PixelRatio.roundToNearestPixel(32*u)
const width_16 = PixelRatio.roundToNearestPixel(35*u)
const width_17 = PixelRatio.roundToNearestPixel(40*u)
const width_18 = PixelRatio.roundToNearestPixel(45*u)
const width_19 = PixelRatio.roundToNearestPixel(50*u)
const width_20 = PixelRatio.roundToNearestPixel(55*u)
const width_21 = PixelRatio.roundToNearestPixel(60*u)
const width_22 = PixelRatio.roundToNearestPixel(80*u)
const width_23 = PixelRatio.roundToNearestPixel(100*u)
const width_24 = PixelRatio.roundToNearestPixel(140*u)
const width_25 = PixelRatio.roundToNearestPixel(200*u)
const width_26 = PixelRatio.roundToNearestPixel(300*u)
const width_27 = PixelRatio.roundToNearestPixel(400*u)

//for things that will be the same color but i want to be able to change which color that is
export const bottom_bar_color = black_2
export const border_color = grey
export const top_bar_color = white
export const bottom_icon_color = grey
export const icon_color = grey
export const dark_icon = black
export const icon_filled_color = yellow
export const dark_text = black
export const placeholder_color = grey_2
export const dark_modal_color = dark_grey
export const line_color = light_grey
// export const loading_color = yellow
export const round_button_color = t

//used in the actual styling 
export const bar_height = height_24
export const icon_height = height_16
export const icon_height_small = height_10
export const bottom_icon_margin_top = height_12
export const header_margin_top = height_23
export const header_margin_bottom = height_20
export const section_margin = height_18
export const sub_section_margin = height_13
export const press_padding = height_12
export const press_padding_small = height_6
export const chef_tab_bar_height = height_23
export const thick_button_height = height_18
export const thin_button_height = height_17
export const round_button_height = height_17
export const small_font_size = height_7
export const font_size = height_10
export const font_size_2 = height_14
export const large_font_size = height_18
export const tri_post_radius = height_9
export const di_post_radius = height_5
export const text_input_height = height_20
export const no_image_height = height_22
export const procedure_height = height_27
export const autofill_height = height_25
export const modal_margin_bottom = height_22
export const spaced_text_height = height_6
export const small_margin = height_3

export const bottom_bar_button_width = width_25
export const stat_box_width = width_22
export const sub_tab_radius = width_14
export const chef_tab_button_width = width_23
export const camera_button_width = width_22
export const chef_tab_button_margin = width_21
export const edge_margin = width_12
export const post_preview_edge_margin = width_20
export const edge_margin_large = width_22
export const stat_box_margin = width_15
export const border_width = width_2
export const post_preview_margin = width_11
export const back_button_margin = width_18
export const create_button_width = width_24
export const adjacent_margin = width_7
export const adjacent_margin_large = width_19
export const large_thumbnail_width = width_25
export const small_thumbnail_width = width_22
export const follow_button_width = width_24
export const small_preview_height = width_23

//global styles
export const style = StyleSheet.create({
    button_shadow: {
        shadowColor: black,
        shadowOffset: {
            width: 0,
            height: PixelRatio.roundToNearestPixel(4*u),
        },
        shadowOpacity: 0.15,
        shadowRadius: PixelRatio.roundToNearestPixel(6*u),
    },
    layer_shadow: {
        shadowColor: '#f54',
        shadowOffset: {
            width: 0,
            height: PixelRatio.roundToNearestPixel(4*u),
        },
        shadowOpacity: 1,
        shadowRadius: PixelRatio.roundToNearestPixel(16*u),
    },
    press_padding: {
        position: 'absolute',
        top: - press_padding,
        bottom: - press_padding,
        right: - press_padding,
        left: - press_padding,
        borderRadius: press_padding * 2,
        // backgroundColor: '#ff00ff20',
    },
    press_padding_small: {
        position: 'absolute',
        top: - press_padding_small,
        bottom: - press_padding_small,
        right: - press_padding_small,
        left: - press_padding_small,
        borderRadius: press_padding_small * 2,
        // backgroundColor: '#ff00ff20',
    },
    press_padding_none: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 1000,
    },
    header: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: header_margin_top - font_size_2 * text_center,
        fontSize: font_size_2,
        color: dark_text,
        // backgroundColor: '#ff00ff',
    },
})