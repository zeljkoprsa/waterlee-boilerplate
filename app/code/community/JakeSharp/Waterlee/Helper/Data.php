<?php

class JakeSharp_Waterlee_Helper_Data extends Mage_Core_Helper_Abstract{
    public function getIsActive(){
        return Mage::getStoreConfig('waterleesection/waterleegroup/theme');
    }
}