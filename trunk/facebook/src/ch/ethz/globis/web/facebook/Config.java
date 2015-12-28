/*
 * @(#)Messages.java	1.0   Feb 19, 2008
 *
 * Copyright 2000-2008 ETH Zurich. All Rights Reserved.
 *
 * This software is the proprietary information of ETH Zurich.
 * Use is subject to license terms.
 *
 */

package ch.ethz.globis.web.facebook;

import java.util.MissingResourceException;
import java.util.ResourceBundle;

/**
 * Externalisation of string constants.
 * 
 * @author Stefania Leone <leone@inf.ethz.ch>
 * @version 1.0
 */
public class Config {

   private static final String BUNDLE_NAME = "ch.ethz.globis.web.facebook.config"; //$NON-NLS-1$

   private static final ResourceBundle RESOURCE_BUNDLE = ResourceBundle
         .getBundle(Config.BUNDLE_NAME);

   private Config() {

      // private constructor
   }

   public static String getValue(final String key) {

      try {
         return Config.RESOURCE_BUNDLE.getString(key);
      } catch (final MissingResourceException e) {
         return '!' + key + '!';
      }
   }
}
