import React from 'react';

import { BsFillShieldLockFill } from 'react-icons/bs';
import { IoIosOptions } from 'react-icons/io';
import { AiOutlineCloudUpload,AiFillLock } from 'react-icons/ai';
import { BiSupport, BiDollar } from 'react-icons/bi';
import { GrHostMaintenance } from 'react-icons/gr';
const iconStyle = (Icon) => <Icon size="3rem" color="#0f0f0f" />;

const location = {
	pathname: '/sampletest',
	state: { testmodule: '' }
  }

export const featuresData = [
	{
		name: 'Sample MCQ Test',
		description: ' Free MCQ Test ',
		icon: iconStyle(BsFillShieldLockFill),
		imgClass: 'one',
		link:location
	},
	{
		name: 'MCQ TEST SERIES',
		description: '50 MCQ Test Modules',
		icon: iconStyle(IoIosOptions),
		imgClass: 'two',
		link:'/mcqtestseries'
	},
	{
		name: 'MCQ TEST PRO ',
		description: 'Unlimited Custom Test Series',
		icon: iconStyle(GrHostMaintenance),
		imgClass: 'three',
		link:'/mcqtestpro'
	},

];
