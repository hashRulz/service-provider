package com.mbaro.pune.controller;

import com.mbaro.pune.model.Image;
import com.mbaro.pune.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.Deflater;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/image")
public class ImageUploadController {

    @Autowired
    ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {

        try {
            System.out.println("Original Image Byte Size - " + file.getBytes().length);
            imageService.saveImage(file);
            return new ResponseEntity(HttpStatus.OK);
        }catch (IOException e){
            return new ResponseEntity(e,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Image> getImage(@PathVariable("id") long id) {

        try {

            return new ResponseEntity<>(imageService.getImage(id),HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity(e,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
