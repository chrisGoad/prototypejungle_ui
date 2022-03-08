/* wall driftweb shelter
*/
module.exports = {
sections: [

[
 //[1000,'grid_grid_1_i_3',3,'instances',1,'Grid 5'], 
 //[1000,'grid_grid_1_i_3_g_1','instances',1,'Grid 5'], // was ['grid0_46','final',1,'Cloudy Sky'],
 //[1000,'grid_grid_1_i_3','instances',1,'Grid 5'], // was ['grid0_46','final',1,'Cloudy Sky'],
 [120,'drop_whorls_sq','instances',1,'Whorls',45], // HH VV
 [220,'random_stripes_sq','instances',1,'Stripes 3',26], 
 [1000,'grid_fade','generators',1,'Fade'], // HH VV
 [1000,'grid_incoming','generators',1,'Incoming'], 
 [1000,'grid_ramp','instances',1,'Ramp',14], // HH VV
 [30,'grid_superposition','generators',1,'Superposition',103], // HH VV
 [1000,'grid_vortex','generators',1,'Vortex',10], // HH VV
 [1000,'grid_enigma','generators',1,'Enigma',10], // HH VV
 [1000,'grid_cloudy_sky','generators',1,'Cloudy Sky',2], 
 [1000,'web_triangles','generators',1,'Triangles',5],
 [1000,'web_spokes','generators',1,'Spokes',4],
  [1000,'web_stripes_2','generators',1,'Stripes 2'],
  [1000,'web_stripes_1','generators',1,'Stripes 1',10],
  [20,'web_diamond','generators',1,'Diamond',137], // HH VV

   [150,'drop_iris_sq','instances',1,'Iris',44], // HH VV

  [180,'drop_aphelion','generators',1,'Aphelion',31], //HH VV

  [200,'web_wheel','generators',1,'Wheel',30], // HH VV


  [210,'drop_arrows','generators',1,'Arrows',27],  // HH VV
 //[1000,'drop_leaves','generators',1,'Leaves'],  // HH
  [60,'drop_dandelion','generators',1,'Dandelion',78], //HH VV
  [1000,'drop_metal_2','generators',1,'Metal 2'], // was [1000,'drop0_5','final',1,'Metal 2'],

	//	 [1000,'grid_bubbles','generators','square','Bubbles',101],// HH
	[70,'spatter_variants','generators','square','Variants',74], // HH VV
	    [140,'drop_ice_sq','instances',1,'Ice',44], // HH VV

    [1000,'grid_bump','generators',1,'Bump'],
  //  [1000,'drop_clouds','generators',1,'Clouds',7], // HH
    [1000,'drop_horizon','generators',1,'Horizon'], //was  [1000,'drop0_3','final',1,'Horizon']

   // [100,'drop_starry_night','generators',1,'Starry Night',47], //  HH
    [1000,'grid_sphere','generators',1,'Sphere',4],
    [1000,'grid_distortion_field','generators',1,'Distortion Field',11],  // TT 
    [1000,'grid_waves','generators',1,'Waves',24], 
   // [1000,'grid_code','generators',1,'Code'],  // HH
// to here

		 [230,'grid_quilt_1','generators','square','Quilt 1',23],
	 	 [80,'grid_world','generators','square','World',64], // HH VV
		 	 [190,'lines_1','generators','square','Lines 1',31], //TT

	 [1000,'grid_shield','generators','square','Shield'],

  // [1000,'grid_message','generators','square','Message',6], //HH
	[260,'grid_mat','generators','square','Mat',17], //TT
		[1000,'grid_smoke_1','generators','square','Smoke 1'],
	[90,'grid_cloth','generators','square','Cloth',54], // HH VV
		[0,'lines_2','generators','wide2','Lines 2'],

	// [240,'grid_quilt_2','generators','square','Quilt 2',19], // TT
//	 [1000,'grid_two_quilts','generators','square','Two Quilts'], // HH
	 [130,'grid_quilt_3','generators','square','Quilt 3',45],


	 
	 	[1000,'grid_metal','generators','square','Metal'], //TT
		[1000,'grid_tube','generators','square','Tube',10],
	[1000,'grid_1','generators','square','Grid 1'],
	[1000,'grid_2','generators','square','Grid 2'],
	
//	[1000,'lines_2','generators','wide2','Lines 2'], // HH
   [160,'grid_maze','generators','square','Maze',38],  
  // [1000,'lines_bugeyes','generators','square','Bug Eyes',6], // HH

   [1000,'lines_lights_sq','instances','square','Lights',12],  // VV 
	 [170,'grid_eye','generators',1,'Eye',34], // TT
	
	 [1000,'grid_3','generators','square','Grid 3'],
	

//	 [1000,'grid_smoke_2','generators','square','Smoke 2'],
	 [250,'grid_signals','generators','square','Signals',18],// HH VV
	 [1000,'grid_beacons','generators','square','Beacons'],
		// [1000,'grid_decos','generators','square','Deco'], moved to altSections
		//		[1000,'grid_star_maps','generators','wide2','Star Maps',2],  
		
				 	[1000,'grid_tracks','generators',0,'Tracks'],
		   [1000,'grid_4','generators','square','Grid 4'],
	//[1000,'spatter_spatter','generators','square','Spatter'], // HH
		 	[50,'grid_void','generators','wide1','Void',100], // was [1000,'grid0_8_18','final','wide1','Void'], 
      
  

],
/* animations 
[
   [1000,'zigzag3_3.mp4','gen2','wide2'],
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
	
 