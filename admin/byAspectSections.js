/* wall driftweb shelter
*/
module.exports = {
sections: [

[
['Square'],
 ['grid_grid_1_i_3',3,'instances',1,'Grid 5'], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['grid_grid_1_i_3_g_1','instances',1,'Grid 5'], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['grid_grid_1_i_3','instances',1,'Grid 5'], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['drop_whorls_sq','instances',1,'Whorls',45], // HH
 ['random_stripes','generators',1,'Rectangle Grid',26], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['grid_fade','generators',1,'Fade'], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['grid_incoming','generators',1,'Incoming'], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['grid_ramp','generators',1,'Ramp',14], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['grid_superposition','generators',1,'Superposition',103], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['grid_vortex','generators',1,'Vortex',10], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['grid_bends','generators',1,'Enigma',10], // was ['grid0_46','final',1,'Clbuoudy Sky'],
 ['grid_cloudy_sky','generators',1,'Cloudy Sky',2], // was ['grid0_46','final',1,'Cloudy Sky'],
 ['web_triangles','generators',1,'Triangles',5],
 ['web_spokes','generators',1,'Spokes',4],
  ['web_stripes_2','generators',1,'Stripes 2'],
  ['web_stripes_1','generators',1,'Stripes 1',10],
  ['web_diamond','generators',1,'Diamond',137],

   ['drop_iris_sq','instances',1,'Iris',44], //was ['drop0_1_27','final',1,'Iris'],

  ['drop_aphelion','generators',1,'Aphelion',31],

  ['web_wheel','generators',1,'Wheel',30],


  ['drop_arrows','generators',1,'Arrows',27],  //was ['drop0_1_21','final',1,'Leaves']
  ['drop_leaves','generators',1,'Leaves'],  // HH
  ['drop_dandelion','generators',1,'Dandelion',78],// was ['drop0_1_24','final',1,'Dandelion'],
  ['drop_metal_2','generators',1,'Metal 2'], // was ['drop0_5','final',1,'Metal 2'],

		 ['grid_bubbles','generators','square','Bubbles',101],// HH
	['spatter_variants','generators','square','Variants',74], // was ['grid0_14_0','final','square','Variants'],
	    ['drop_ice_sq','instances',1,'Ice',44], // was   ['drop0_0','final',1,'Ice'],

    ['grid_bump','generators',1,'Bump'],
    ['drop_clouds','generators',1,'Clouds',7], // HH
    ['drop_horizon','generators',1,'Horizon'], //was  ['drop0_3','final',1,'Horizon']

    ['drop_starry_night','generators',1,'Starry Night',47], //  HH
    ['grid_sphere','generators',1,'Sphere',4],
    ['grid_distortion_field','generators',1,'Distortion Field',11],  // was ['grid0_28','final',1,'Distortion Field'],
    ['grid_waves','generators',1,'Waves',24], //was ['grid0_16_1','final',1,'Waves'],
    ['grid_code','generators',1,'Code'],  // HH


		 ['grid_quilt_1','generators','square','Quilt 1',23],// was //['grid0_8_15.jpg','final','square','Quilt 1'],
	 	 ['grid_world.jpg','generators','square','World',64],  // was ['grid0_19.jpg','final','square','World'],
		 	 ['lines_1','generators','square','Lines 1',31],

	 ['grid_shield','generators','square','Shield'],
			 ['lines_chaos_within_order','generators','wide2','Chaos Within Order',152], //HH

   ['grid_message','generators','square','Message',6], //HH
	['grid_mat','generators','square','Mat',17],
		['grid_smoke_1','generators','square','Smoke 1'],
	['grid_cloth','generators','square','Cloth',54],
	

	 ['grid_quilt_2','generators','square','Quilt 2',19],
	 ['grid_two_quilts','generators','square','Two Quilts'], // HH
	 ['grid_quilt_3','generators','square','Quilt 3',45],


	 
	 	['grid_metal','generators','square','Metal'],
		['grid_tube','generators','square','Tube',10],
	['grid_1','generators','square','Grid 1'],
	['grid_2','generators','square','Grid 2'],
	
	['lines_2','generators','wide2','Lines 2'], // HH
   ['grid_maze','generators','square','Maze',38],  // was ['grid0_8','final','square','Maze'],
   ['lines_bugeyes','generators','square','Bug Eyes',6], // HH
	
   ['lines_lights','generators','square','Lights',12],  // VV 
	 ['grid_eye.jpg','generators',1,'Eye',34],
	
	 ['grid_3','generators','square','Grid 3'],
	

	 ['grid_smoke_2','generators','square','Smoke 2'],
	 ['grid_signals','generators','square','Signals',18],
	 ['grid_beacons','generators','square','Beacons'],
		// ['grid_decos','generators','square','Deco'], moved to altSections
		//		['grid_star_maps','generators','wide2','Star Maps',2],  // moved to altSections HH
		
				 	['grid_tracks','generators',0,'Tracks'],
		   ['grid_4','generators','square','Grid 4'],// was ['grid_0_5','final','square','Grid 4']
	['spatter_spatter','generators','square','Spatter'],
		 	['grid_void','generators','wide1','Void',100], // was ['grid0_8_18','final','wide1','Void'], 
      
  ['horizontal'],
   ['drop_whorls_h','instances',1,'Whorls',45], // was ['grid0_46','final',1,'Cloudy Sky'],
     ['drop_leaves','generators',1,'Leaves'],  // HH
		 ['grid_bubbles','generators','square','Bubbles',101],// HH
 ['drop_clouds','generators',1,'Clouds',7], // HH
 ['drop_starry_night','generators',1,'Starry Night',47], //  HH
     ['grid_code','generators',1,'Code'],  // HH
			 ['lines_chaos_within_order','generators','wide2','Chaos Within Order',152], //HH
          ['grid_message','generators','square','Message',6], //HH
['grid_two_quilts','generators','square','Two Quilts'], // HH
	['lines_2','generators','wide2','Lines 2'], // HH
   ['lines_bugeyes','generators','square','Bug Eyes',6], // HH
    ['grid_atlas','generators','wide2','Atlas',10], // HH
	 ['grid_book','generators','wide2','Book'],  // HH
	    ['drop_ice_h','instances',1,'Ice',44], // was   ['drop0_0','final',1,'Ice'],

   
   ['Vertical'],
      ['lines_lights','generators','square','Lights',12],  // VV 
   ['drop_whorls_v','instances',1,'Whorls',45], // was ['grid0_46','final',1,'Cloudy Sky'],
   ['drop_iris_v','instances',1,'Iris',44], //was ['drop0_1_27','final',1,'Iris'],
   ['drop_dandelion_v','instances',1,'Dandelion'], //was ['drop0_1_27','final',1,'Iris'],
 ['grid_superposition_v','instances',1,'Superposition',103], // was ['grid0_46','final',1,'Cloudy Sky'],
		 	['grid_void_v','instances','wide1','Void',100], // was ['grid0_8_18','final','wide1','Void'], 
  ['web_diamond_v','instances',1,'Diamond',137],
  	    ['drop_ice_v','instances',1,'Ice',44], // was   ['drop0_0','final',1,'Ice'],
  	    ['web_wheel_v','instances',1,'Wheel',30], // was   ['drop0_0','final',1,'Ice'],
  	    ['random_stripes_v','instances',1,'Random Stripes'], // was   ['drop0_0','final',1,'Ice'],
  	    ['drop_starry_night_v','instances',1,'Starry Night'], // was   ['drop0_0','final',1,'Ice'],
  	    ['drop_aphelion_v','instances',1,'Aphelion'], // was   ['drop0_0','final',1,'Ice'],



],
/* animations 
[
   ['zigzag3_3.mp4','gen2','wide2'],
	 ['grid0_9.mp4','gen2','square','Animation'],

	 ['wander0_1.mp4','gen2','square'],
	 ['wander0_1_2.mp4','gen2','wide2'],
	 ['mlines0_4.mp4','gen2','wide2','Rotation'],
	 ['mlines0_7.mp4','gen2','Square'],
	 ['zigzag3_3.mp4','gen2','wide2'],
	 ['grid0_9.mp4','gen2','square','Animation'],
	

	 ['wander0_1.mp4','gen2','square'],
	 ['wander0_1_2.mp4','gen2','wide2'],
	 ['mlines0_4.mp4','gen2','wide2','Rotation'],
	 ['mlines0_7.mp4','gen2','Square'],

	 ['pulse0_3.mp4','gen2','wide2'],
	 ['spin0_2.mp4','gen2','wide2'],
	 ['spatter0_7.mp4','gen2','square'],
	 ['wander0_3.mp4','gen2','square'],

	 ['mlines0_5.mp4','gen2','wide2'],
	 ['broken1_2.gif','gen2','square'],
	 ['broken1_0.gif','gen2','wide2'],
	 ['broken1_4.gif','gen2','wide2'],

	 ['broken1_5.gif','gen2','square'],
	 ['broken1_6.gif','gen2','square'],
	 ['lines0_4.gif','gen2','square'],
	 ['lines0_5.gif','gen2','square'],

	 ['grid_1_5.gif','gen2','square'],
	 ['grid_1_9.gif','gen2','square'],
	 ['grid_1_13.gif','gen2','wide2'],
]
*/
]
};
	
 