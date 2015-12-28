/*
 * @(#)Login.java	1.0   Feb 19, 2008
 *
 * Copyright 2000-2008 ETH Zurich. All Rights Reserved.
 *
 * This software is the proprietary information of ETH Zurich.
 * Use is subject to license terms.
 *
 */
package ch.ethz.globis.web.facebook;

import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;

/**
 * Output Generator
 * 
 * @author Stefania Leone <leone@inf.ethz.ch>
 * @version 1.0
 */
public class OutputGenerator {

   private static final long serialVersionUID = 1L;

   private static final String DIR_XSL = Config.getValue("DIR_XSL");

   /**
    * Transforms the incoming xml source to an output result
    * 
    * @param xmlSource
    * @param output
    */
   public static void transformToXML(final Source xmlSource, final StreamResult output) {

      try {
         final Transformer txTransformer = TransformerFactory.newInstance().newTransformer();
         txTransformer.transform(xmlSource, output);
      } catch (final TransformerException e) {
         System.out.println(e.getMessage());
         e.printStackTrace();
      }

   }

   /**
    * Transforms the incoming xmlSource to an output result. The XSLT document xsltSource is
    * used for the transformation.
    * 
    * @param xmlSource
    * @param xsltSource
    * @param output
    */
   public static void transformWithStyle(final Source xmlSource, final Source xsltSource,
         final StreamResult output) {

      try {
         final Transformer txTransformer = TransformerFactory.newInstance().newTransformer(
               xsltSource);
         txTransformer.transform(xmlSource, output);

      } catch (final TransformerException e) {
         System.out.println(e.getMessage());
         e.printStackTrace();
      }
   }

}
