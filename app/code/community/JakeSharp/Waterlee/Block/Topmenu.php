<?php
class JakeSharp_Waterlee_Block_Topmenu extends Mage_Page_Block_Html_Topmenu {

    protected function _getHtml(Varien_Data_Tree_Node $menuTree, $childrenWrapClass)
    {

        if (!Mage::helper('waterlee')->getIsActive()){
            return parent::_getHtml($menuTree,$childrenWrapClass);
        }

        $html = '';

        $children = $menuTree->getChildren();
        $parentLevel = $menuTree->getLevel();
        $childLevel = is_null($parentLevel) ? 0 : $parentLevel + 1;

        $counter = 1;
        $childrenCount = $children->count();

        $parentPositionClass = $menuTree->getPositionClass();
        $itemPositionClassPrefix = $parentPositionClass ? $parentPositionClass . '-' : 'nav-';

        foreach ($children as $child) {

            if ($child->getId()!="category-node-131"){

                $child->setLevel($childLevel);
                $child->setIsFirst($counter == 1);
                $child->setIsLast($counter == $childrenCount);
                $child->setPositionClass($itemPositionClassPrefix . $counter);

                $outermostClassCode = '';
                $outermostClass = $menuTree->getOutermostClass();

                if ($childLevel == 0 && $outermostClass) {
                    $outermostClassCode = ' class="' . $outermostClass . '" ';
                    $child->setClass($outermostClass);
                }

                $html .= '<li ' . $this->_getRenderedMenuItemAttributes($child) . '>';
                $html .= '<a href="' . $child->getUrl() . '" ' . $outermostClassCode . '><span>'
                    . $this->escapeHtml($child->getName()) . '</span></a>'.$this->getHaseDropdown($child);

                if ($child->hasChildren()) {
                    if (!empty($childrenWrapClass)) {
                        $html .= '<div class="' . $childrenWrapClass . '">';
                    }
                    $html .= '<ul class="level' . $childLevel . ' dropdown' . '">';
                    $html .= $this->_getHtml($child, $childrenWrapClass);
                    $html .= '</ul>';

                    if (!empty($childrenWrapClass)) {
                        $html .= '</div>';
                    }
                }
                $html .= '</li>';

                $counter++;
            }

        }

        return $html;
    }


    protected function _getMenuItemClasses(Varien_Data_Tree_Node $item)
    {
        if (!Mage::helper('waterlee')->getIsActive()){
            return parent::_getMenuItemClasses($item);
        }

        $classes = array();

        $classes[] = 'level' . $item->getLevel();
        $classes[] = $item->getPositionClass();

        if ($item->getIsFirst()) {
            $classes[] = 'first';
        }

        if ($item->getIsActive()) {
            $classes[] = 'active';
        }

        if ($item->getIsLast()) {
            $classes[] = 'last';
        }

        if ($item->getClass()) {
            $classes[] = $item->getClass();
        }

        if ($item->hasChildren()) {
            $classes[] = 'has-dropdown';
        }

        return $classes;
    }


}