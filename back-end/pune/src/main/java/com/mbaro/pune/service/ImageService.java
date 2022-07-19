package com.mbaro.pune.service;

import com.mbaro.pune.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {

    void saveImage(MultipartFile file) throws IOException;
    Image getImage(long id) throws IOException;

}
