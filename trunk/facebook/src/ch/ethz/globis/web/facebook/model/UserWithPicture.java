package ch.ethz.globis.web.facebook.model;

import com.restfb.Facebook;
import com.restfb.types.User;

/**
 * Model class for a User with picture
 * 
 * @author Michael Nebeling <nebeling@inf.ethz.ch>
 * @version 1.0
 */
public class UserWithPicture extends User {

   @Facebook
   private String picture;

   public String getPicture() {

      return this.picture;
   }

}
